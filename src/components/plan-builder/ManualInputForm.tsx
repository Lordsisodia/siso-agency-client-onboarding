
import { useState } from "react";
import { CompanyIdentityStep } from "./steps/CompanyIdentityStep";
import { ProjectGoalsStep } from "./steps/ProjectGoalsStep";
import { FeatureSelectionStep } from "./steps/FeatureSelectionStep";
import { ProgressIndicator } from "./ProgressIndicator";
import { FormNavigation } from "./FormNavigation";
import { featureOptions } from "./types";

interface ManualInputFormProps {
  onClose: () => void;
  onSubmitToAI: (prompt: string, formData: Record<string, any>) => Promise<void>;
}

export function ManualInputForm({ onClose, onSubmitToAI }: ManualInputFormProps) {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, { selected: boolean, priority: "must-have" | "nice-to-have" | null }>>(
    featureOptions.reduce((acc, feature) => {
      acc[feature.id] = { selected: false, priority: null };
      return acc;
    }, {} as Record<string, { selected: boolean, priority: "must-have" | "nice-to-have" | null }>)
  );

  const stepLabels = ["Company Identity", "Project Goals", "Feature Selection"];
  const totalSteps = stepLabels.length;

  const goToNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFeatureSelection = (featureId: string) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: { 
        ...prev[featureId],
        selected: !prev[featureId].selected,
        priority: !prev[featureId].selected ? "nice-to-have" : null
      }
    }));
  };

  const handlePriorityChange = (featureId: string, priority: "must-have" | "nice-to-have") => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: { ...prev[featureId], priority }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Create structured data
    const formData = {
      companyInfo: {
        name: companyName,
        website: websiteUrl,
        businessType: businessType
      },
      projectDetails: {
        goal: projectGoal,
        targetAudience: targetAudience,
        timeframe: timeframe,
        budgetRange: budgetRange
      },
      features: Object.entries(selectedFeatures)
        .filter(([_, value]) => value.selected)
        .reduce((acc, [id, value]) => {
          const feature = featureOptions.find(f => f.id === id);
          if (feature) {
            acc.push({
              name: feature.name,
              description: feature.description,
              category: feature.category,
              priority: value.priority
            });
          }
          return acc;
        }, [] as any[])
    };

    // Generate a prompt based on the form data
    const prompt = `I'm planning to build an app for ${companyName || 'my business'} (${businessType || 'business type not specified'}). 
    The main goal is: ${projectGoal || 'to create a new app'}. 
    Our target audience is: ${targetAudience || 'not specified'}. 
    We want to complete this project in ${timeframe || 'a reasonable timeframe'}. 
    Our budget range is ${budgetRange || 'flexible'}. 
    I'm interested in these key features: ${formData.features.map(f => `${f.name} (${f.priority})`).join(', ')}. 
    Could you create a comprehensive project plan including technical requirements, timeline, and budget estimate?`;

    try {
      await onSubmitToAI(prompt, formData);
    } catch (error) {
      console.error("Error submitting to AI:", error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  // Check if current step is complete to enable the next button
  const isStepComplete = () => {
    if (step === 1) {
      return companyName.trim() !== "";
    } else if (step === 2) {
      return projectGoal.trim() !== "";
    } else {
      return Object.values(selectedFeatures).some(feature => feature.selected);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-card rounded-lg overflow-hidden shadow-xl border border-border">
      {/* Progress Indicator */}
      <ProgressIndicator 
        currentStep={step} 
        totalSteps={totalSteps}
        stepLabels={stepLabels}
      />

      {/* Form Content */}
      <div className="p-6 bg-card">
        {step === 1 && (
          <CompanyIdentityStep
            companyName={companyName}
            setCompanyName={setCompanyName}
            websiteUrl={websiteUrl}
            setWebsiteUrl={setWebsiteUrl}
            businessType={businessType}
            setBusinessType={setBusinessType}
          />
        )}

        {step === 2 && (
          <ProjectGoalsStep
            projectGoal={projectGoal}
            setProjectGoal={setProjectGoal}
            targetAudience={targetAudience}
            setTargetAudience={setTargetAudience}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            budgetRange={budgetRange}
            setBudgetRange={setBudgetRange}
          />
        )}

        {step === 3 && (
          <FeatureSelectionStep
            featureOptions={featureOptions}
            selectedFeatures={selectedFeatures}
            onFeatureSelection={handleFeatureSelection}
            onPriorityChange={handlePriorityChange}
          />
        )}
      </div>

      {/* Footer Navigation */}
      <FormNavigation
        currentStep={step}
        totalSteps={totalSteps}
        isStepComplete={isStepComplete()}
        isSubmitting={isSubmitting}
        onCancel={onClose}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
