
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  Rocket,
  Book,
  Gem,
  Code,
  Clock
} from 'lucide-react';

interface FormData {
  basicInfo: {
    projectName: string;
    businessType: string;
    companySize: string;
    contactEmail: string;
  };
  requirements: {
    primaryGoal: string;
    targetAudience: string;
    businessProblem: string;
  };
  features: {
    mustHave: string;
    niceToHave: string;
    futureConsiderations: string;
  };
  technical: {
    platform: string;
    integrations: string;
    security: string;
  };
  timeline: {
    deadline: string;
    budget: string;
    additionalNotes: string;
  };
}

interface ManualInputFormProps {
  onClose: () => void;
  onSubmitToAI: (prompt: string) => Promise<void>;
}

export function ManualInputForm({ onClose, onSubmitToAI }: ManualInputFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      projectName: '',
      businessType: '',
      companySize: '',
      contactEmail: '',
    },
    requirements: {
      primaryGoal: '',
      targetAudience: '',
      businessProblem: '',
    },
    features: {
      mustHave: '',
      niceToHave: '',
      futureConsiderations: '',
    },
    technical: {
      platform: '',
      integrations: '',
      security: '',
    },
    timeline: {
      deadline: '',
      budget: '',
      additionalNotes: '',
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (
    section: keyof FormData, 
    field: string, 
    value: string
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      }
    });
  };

  const goToNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Format the data into a structured prompt for the AI
    const prompt = `
      I need a plan for my app with the following details:
      
      ## Basic Information
      Project Name: ${formData.basicInfo.projectName}
      Business Type: ${formData.basicInfo.businessType}
      Company Size: ${formData.basicInfo.companySize}
      Contact: ${formData.basicInfo.contactEmail}
      
      ## Requirements
      Primary Goal: ${formData.requirements.primaryGoal}
      Target Audience: ${formData.requirements.targetAudience}
      Business Problem: ${formData.requirements.businessProblem}
      
      ## Features
      Must-Have Features: ${formData.features.mustHave}
      Nice-to-Have Features: ${formData.features.niceToHave}
      Future Considerations: ${formData.features.futureConsiderations}
      
      ## Technical Specifications
      Platform/Technologies: ${formData.technical.platform}
      Integrations Needed: ${formData.technical.integrations}
      Security Requirements: ${formData.technical.security}
      
      ## Timeline & Budget
      Deadline: ${formData.timeline.deadline}
      Budget Range: ${formData.timeline.budget}
      Additional Notes: ${formData.timeline.additionalNotes}
      
      Based on this information, please create a project specification that includes recommended technologies, estimated timeline, phased approach, potential challenges, and estimated costs.
    `;
    
    try {
      await onSubmitToAI(prompt.trim());
      onClose();
    } catch (error) {
      console.error("Error submitting form data to AI:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Rocket className="text-siso-orange h-5 w-5" />
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input 
                  id="projectName"
                  value={formData.basicInfo.projectName}
                  onChange={(e) => updateFormData('basicInfo', 'projectName', e.target.value)}
                  placeholder="What should we call your project?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="businessType">Business Type/Industry</Label>
                <Input 
                  id="businessType"
                  value={formData.basicInfo.businessType}
                  onChange={(e) => updateFormData('basicInfo', 'businessType', e.target.value)}
                  placeholder="E.g., Retail, Healthcare, Finance, etc."
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Input 
                  id="companySize"
                  value={formData.basicInfo.companySize}
                  onChange={(e) => updateFormData('basicInfo', 'companySize', e.target.value)}
                  placeholder="E.g., Startup, SMB, Enterprise, etc."
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input 
                  id="contactEmail"
                  type="email"
                  value={formData.basicInfo.contactEmail}
                  onChange={(e) => updateFormData('basicInfo', 'contactEmail', e.target.value)}
                  placeholder="Your email address"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Book className="text-siso-orange h-5 w-5" />
              <h2 className="text-xl font-semibold">Requirements & Goals</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="primaryGoal">Primary Goal</Label>
                <Textarea 
                  id="primaryGoal"
                  value={formData.requirements.primaryGoal}
                  onChange={(e) => updateFormData('requirements', 'primaryGoal', e.target.value)}
                  placeholder="What's the main goal of this project?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea 
                  id="targetAudience"
                  value={formData.requirements.targetAudience}
                  onChange={(e) => updateFormData('requirements', 'targetAudience', e.target.value)}
                  placeholder="Who will be using this application?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="businessProblem">Business Problem</Label>
                <Textarea 
                  id="businessProblem"
                  value={formData.requirements.businessProblem}
                  onChange={(e) => updateFormData('requirements', 'businessProblem', e.target.value)}
                  placeholder="What business problem are you trying to solve?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Gem className="text-siso-orange h-5 w-5" />
              <h2 className="text-xl font-semibold">Features</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="mustHave">Must-Have Features</Label>
                <Textarea 
                  id="mustHave"
                  value={formData.features.mustHave}
                  onChange={(e) => updateFormData('features', 'mustHave', e.target.value)}
                  placeholder="Essential features for MVP (separate with commas)"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="niceToHave">Nice-to-Have Features</Label>
                <Textarea 
                  id="niceToHave"
                  value={formData.features.niceToHave}
                  onChange={(e) => updateFormData('features', 'niceToHave', e.target.value)}
                  placeholder="Secondary features that would be nice (separate with commas)"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="futureConsiderations">Future Considerations</Label>
                <Textarea 
                  id="futureConsiderations"
                  value={formData.features.futureConsiderations}
                  onChange={(e) => updateFormData('features', 'futureConsiderations', e.target.value)}
                  placeholder="Long-term features or expansion plans"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Code className="text-siso-orange h-5 w-5" />
              <h2 className="text-xl font-semibold">Technical Specifications</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="platform">Platform/Technologies</Label>
                <Textarea 
                  id="platform"
                  value={formData.technical.platform}
                  onChange={(e) => updateFormData('technical', 'platform', e.target.value)}
                  placeholder="Web, Mobile, Desktop? Any specific technologies preferred?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="integrations">Integrations Needed</Label>
                <Textarea 
                  id="integrations"
                  value={formData.technical.integrations}
                  onChange={(e) => updateFormData('technical', 'integrations', e.target.value)}
                  placeholder="APIs, third-party services, existing systems?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="security">Security Requirements</Label>
                <Textarea 
                  id="security"
                  value={formData.technical.security}
                  onChange={(e) => updateFormData('technical', 'security', e.target.value)}
                  placeholder="Any specific security requirements or compliance needs?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="text-siso-orange h-5 w-5" />
              <h2 className="text-xl font-semibold">Timeline & Budget</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="deadline">Project Deadline</Label>
                <Input 
                  id="deadline"
                  value={formData.timeline.deadline}
                  onChange={(e) => updateFormData('timeline', 'deadline', e.target.value)}
                  placeholder="When do you need this completed?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Input 
                  id="budget"
                  value={formData.timeline.budget}
                  onChange={(e) => updateFormData('timeline', 'budget', e.target.value)}
                  placeholder="What's your budget range for this project?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea 
                  id="additionalNotes"
                  value={formData.timeline.additionalNotes}
                  onChange={(e) => updateFormData('timeline', 'additionalNotes', e.target.value)}
                  placeholder="Any other information we should know?"
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
      {/* Progress bar */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
        {[1, 2, 3, 4, 5].map((step) => (
          <div 
            key={step}
            className="flex flex-col items-center"
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step < currentStep 
                  ? 'bg-siso-orange text-white' 
                  : step === currentStep 
                    ? 'bg-siso-orange/20 text-white border border-siso-orange' 
                    : 'bg-black/30 text-white/50 border border-white/20'
              }`}
            >
              {step < currentStep ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            <div className="text-xs mt-1 text-white/70">
              {step === 1 && 'Basics'}
              {step === 2 && 'Goals'}
              {step === 3 && 'Features'}
              {step === 4 && 'Tech'}
              {step === 5 && 'Timeline'}
            </div>
          </div>
        ))}
      </div>
      
      {/* Form content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <div className="px-6 py-4 border-t border-white/10 flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              className="bg-black/30 border-white/10 hover:bg-black/50 text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-black/30"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          
          {currentStep < 5 ? (
            <Button
              variant="default"
              onClick={goToNextStep}
              className="bg-gradient-to-r from-siso-orange to-siso-red text-white"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-siso-orange to-siso-red text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit to AI'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
