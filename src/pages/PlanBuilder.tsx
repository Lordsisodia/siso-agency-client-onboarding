
import { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlanBuilderSteps } from '@/components/plan-builder/PlanBuilderSteps';
import { BasicInfoForm, BasicInfoData } from '@/components/plan-builder/BasicInfoForm';
import { RequirementsForm, RequirementsData } from '@/components/plan-builder/RequirementsForm';
import { FeaturesForm, FeaturesData } from '@/components/plan-builder/FeaturesForm';
import { SpecificationsForm, SpecificationsData } from '@/components/plan-builder/SpecificationsForm';
import { SummaryView } from '@/components/plan-builder/SummaryView';

export default function PlanBuilder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    projectName: '',
    companyName: '',
    contactName: '',
    contactEmail: '',
    website: '',
    overview: '',
  });
  const [requirements, setRequirements] = useState<RequirementsData>({
    goals: [''],
    requirements: [''],
    targetAudience: '',
    targetLaunchDate: '',
  });
  const [features, setFeatures] = useState<FeaturesData>({
    selectedFeatures: [],
    totalCost: 0,
  });
  const [specifications, setSpecifications] = useState<SpecificationsData>({
    detailedSpecifications: '',
    designNotes: '',
    integrationNotes: '',
  });

  const stepTitles = ["Basic Info", "Requirements", "Features", "Specifications", "Summary"];
  
  const handleBasicInfoNext = (data: BasicInfoData) => {
    setBasicInfo(data);
    setCurrentStep(1);
  };
  
  const handleRequirementsNext = (data: RequirementsData) => {
    setRequirements(data);
    setCurrentStep(2);
  };
  
  const handleFeaturesNext = (data: FeaturesData) => {
    setFeatures(data);
    setCurrentStep(3);
  };
  
  const handleSpecificationsNext = (data: SpecificationsData) => {
    setSpecifications(data);
    setCurrentStep(4);
  };
  
  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };
  
  const handleComplete = () => {
    // Here you would typically save the plan to the database
    // For now, we'll just navigate back to projects page
    navigate('/projects');
  };
  
  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        
        <div className="relative z-10 container px-4 py-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Plan Builder
            </h1>
            <p className="mt-4 text-lg text-siso-text/80 max-w-2xl mx-auto">
              Create detailed specifications for your custom app. Our interactive builder helps you define requirements and generate accurate estimates.
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <PlanBuilderSteps 
              currentStep={currentStep}
              totalSteps={stepTitles.length}
              stepTitles={stepTitles}
            />
            
            <div className="bg-black/20 border border-siso-orange/20 rounded-xl p-6 backdrop-blur-sm">
              {currentStep === 0 && (
                <BasicInfoForm 
                  onNext={handleBasicInfoNext}
                  initialData={basicInfo}
                />
              )}
              
              {currentStep === 1 && (
                <RequirementsForm 
                  onNext={handleRequirementsNext}
                  onBack={handleBack}
                  initialData={requirements}
                />
              )}
              
              {currentStep === 2 && (
                <FeaturesForm 
                  onNext={handleFeaturesNext}
                  onBack={handleBack}
                  initialData={features}
                />
              )}
              
              {currentStep === 3 && (
                <SpecificationsForm 
                  onNext={handleSpecificationsNext}
                  onBack={handleBack}
                  initialData={specifications}
                />
              )}
              
              {currentStep === 4 && (
                <SummaryView 
                  basicInfo={basicInfo}
                  requirements={requirements}
                  features={features}
                  specifications={specifications}
                  onBack={handleBack}
                  onSubmit={handleComplete}
                  onEdit={handleEdit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
