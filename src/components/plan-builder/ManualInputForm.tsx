
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  Rocket,
  Book,
  Gem,
  Code,
  Clock,
  Globe,
  User,
  DollarSign,
  MousePointer,
  ShoppingCart,
  Users,
  MessageSquare,
  Bell,
  Lock,
  Database,
  Smartphone
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FeatureOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'core' | 'advanced' | 'premium';
}

interface FormData {
  companyInfo: {
    companyName: string;
    websiteUrl: string;
    industry: string;
    companySize: string;
    contactEmail: string;
  };
  projectGoals: {
    primaryGoal: string;
    targetAudience: string;
    competitors: string;
    timeline: string;
    budget: string;
  };
  selectedFeatures: string[];
  featurePriorities: Record<string, 'must-have' | 'nice-to-have' | 'future'>;
}

interface ManualInputFormProps {
  onClose: () => void;
  onSubmitToAI: (prompt: string, formData?: Record<string, any>) => Promise<void>;
}

export function ManualInputForm({ onClose, onSubmitToAI }: ManualInputFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyInfo: {
      companyName: '',
      websiteUrl: '',
      industry: '',
      companySize: '',
      contactEmail: '',
    },
    projectGoals: {
      primaryGoal: '',
      targetAudience: '',
      competitors: '',
      timeline: '',
      budget: '',
    },
    selectedFeatures: [],
    featurePriorities: {},
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feature options the user can select
  const featureOptions: FeatureOption[] = [
    // Core features
    { 
      id: 'user-auth', 
      name: 'User Authentication', 
      description: 'Secure login/signup system with email or social media',
      icon: <User className="h-8 w-8" />,
      category: 'core'
    },
    { 
      id: 'responsive', 
      name: 'Responsive Design', 
      description: 'Optimized for all devices (desktop, tablet, mobile)',
      icon: <Smartphone className="h-8 w-8" />,
      category: 'core'
    },
    { 
      id: 'payment', 
      name: 'Payment Processing', 
      description: 'Secure payment gateway integration',
      icon: <DollarSign className="h-8 w-8" />,
      category: 'core'
    },
    
    // Advanced features
    { 
      id: 'cms', 
      name: 'Content Management', 
      description: 'Easy content editing and publishing system',
      icon: <Book className="h-8 w-8" />,
      category: 'advanced'
    },
    { 
      id: 'analytics', 
      name: 'Analytics Dashboard', 
      description: 'Track user behavior and business metrics',
      icon: <Code className="h-8 w-8" />,
      category: 'advanced'
    },
    { 
      id: 'cart', 
      name: 'Shopping Cart', 
      description: 'E-commerce functionality with cart and checkout',
      icon: <ShoppingCart className="h-8 w-8" />,
      category: 'advanced'
    },
    { 
      id: 'social', 
      name: 'Social Integration', 
      description: 'Share content and login with social accounts',
      icon: <Users className="h-8 w-8" />,
      category: 'advanced'
    },
    
    // Premium features
    { 
      id: 'chat', 
      name: 'Live Chat Support', 
      description: 'Real-time customer support system',
      icon: <MessageSquare className="h-8 w-8" />,
      category: 'premium'
    },
    { 
      id: 'notifications', 
      name: 'Push Notifications', 
      description: 'Send alerts to users across platforms',
      icon: <Bell className="h-8 w-8" />,
      category: 'premium'
    },
    { 
      id: 'security', 
      name: 'Advanced Security', 
      description: 'Extra protection with 2FA and encryption',
      icon: <Lock className="h-8 w-8" />,
      category: 'premium'
    },
    { 
      id: 'api', 
      name: 'API Integration', 
      description: 'Connect with third-party services and systems',
      icon: <Database className="h-8 w-8" />,
      category: 'premium'
    },
  ];

  const updateCompanyInfo = (field: string, value: string) => {
    setFormData({
      ...formData,
      companyInfo: {
        ...formData.companyInfo,
        [field]: value,
      }
    });
  };

  const updateProjectGoals = (field: string, value: string) => {
    setFormData({
      ...formData,
      projectGoals: {
        ...formData.projectGoals,
        [field]: value,
      }
    });
  };

  const toggleFeatureSelection = (featureId: string) => {
    const isSelected = formData.selectedFeatures.includes(featureId);
    
    if (isSelected) {
      // Remove the feature
      setFormData({
        ...formData,
        selectedFeatures: formData.selectedFeatures.filter(id => id !== featureId),
        featurePriorities: {
          ...formData.featurePriorities,
          [featureId]: undefined
        }
      });
    } else {
      // Add the feature with default priority
      setFormData({
        ...formData,
        selectedFeatures: [...formData.selectedFeatures, featureId],
        featurePriorities: {
          ...formData.featurePriorities,
          [featureId]: 'must-have'
        }
      });
    }
  };

  const updateFeaturePriority = (featureId: string, priority: 'must-have' | 'nice-to-have' | 'future') => {
    setFormData({
      ...formData,
      featurePriorities: {
        ...formData.featurePriorities,
        [featureId]: priority
      }
    });
  };

  const goToNextStep = () => {
    if (currentStep < 3) {
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
    
    // Get feature details for selected features
    const selectedFeatureDetails = formData.selectedFeatures.map(featureId => {
      const feature = featureOptions.find(f => f.id === featureId);
      return {
        name: feature?.name,
        priority: formData.featurePriorities[featureId] || 'must-have'
      };
    });
    
    // Format the data into a structured prompt for the AI
    const prompt = `
      I need a plan for my app with the following details:
      
      ## Company Information
      Company Name: ${formData.companyInfo.companyName}
      Website/Social: ${formData.companyInfo.websiteUrl}
      Industry: ${formData.companyInfo.industry}
      Company Size: ${formData.companyInfo.companySize}
      Contact: ${formData.companyInfo.contactEmail}
      
      ## Project Goals
      Primary Goal: ${formData.projectGoals.primaryGoal}
      Target Audience: ${formData.projectGoals.targetAudience}
      Competitors: ${formData.projectGoals.competitors}
      Timeline: ${formData.projectGoals.timeline}
      Budget Range: ${formData.projectGoals.budget}
      
      ## Selected Features
      ${selectedFeatureDetails.map(feature => 
        `- ${feature.name} (${feature.priority})`
      ).join('\n')}
      
      Based on this information, please create a project specification that includes recommended technologies, estimated timeline, phased approach, potential challenges, and estimated costs. Please prioritize the selected features according to their priority levels.
    `;
    
    try {
      // Pass both the prompt and the raw form data
      await onSubmitToAI(prompt.trim(), formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form data to AI:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    return (currentStep / 3) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="text-siso-orange h-6 w-6" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">Company Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName" className="text-white/90">Company Name</Label>
                <Input 
                  id="companyName"
                  value={formData.companyInfo.companyName}
                  onChange={(e) => updateCompanyInfo('companyName', e.target.value)}
                  placeholder="Your company or project name"
                  className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30"
                />
              </div>
              
              <div>
                <Label htmlFor="websiteUrl" className="text-white/90">Website or Social Media URL</Label>
                <Input 
                  id="websiteUrl"
                  value={formData.companyInfo.websiteUrl}
                  onChange={(e) => updateCompanyInfo('websiteUrl', e.target.value)}
                  placeholder="https://yourcompany.com or social media link"
                  className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30"
                />
                <p className="text-xs text-white/50 mt-1">This helps us understand your brand identity</p>
              </div>
              
              <div>
                <Label htmlFor="industry" className="text-white/90">Industry</Label>
                <Select
                  onValueChange={(value) => updateCompanyInfo('industry', value)}
                  defaultValue={formData.companyInfo.industry}
                >
                  <SelectTrigger className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 border-white/20 text-white">
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="companySize" className="text-white/90">Company Size</Label>
                <Select
                  onValueChange={(value) => updateCompanyInfo('companySize', value)}
                  defaultValue={formData.companyInfo.companySize}
                >
                  <SelectTrigger className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 border-white/20 text-white">
                    <SelectItem value="solo">Solo Entrepreneur</SelectItem>
                    <SelectItem value="small">Small (2-10 employees)</SelectItem>
                    <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
                    <SelectItem value="large">Large (50+ employees)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (500+ employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="contactEmail" className="text-white/90">Contact Email</Label>
                <Input 
                  id="contactEmail"
                  type="email"
                  value={formData.companyInfo.contactEmail}
                  onChange={(e) => updateCompanyInfo('contactEmail', e.target.value)}
                  placeholder="your@email.com"
                  className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Book className="text-siso-orange h-6 w-6" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">Project Goals</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryGoal" className="text-white/90">Primary Goal</Label>
                <Textarea 
                  id="primaryGoal"
                  value={formData.projectGoals.primaryGoal}
                  onChange={(e) => updateProjectGoals('primaryGoal', e.target.value)}
                  placeholder="What's the main goal of this project?"
                  className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30 min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="targetAudience" className="text-white/90">Target Audience</Label>
                <Textarea 
                  id="targetAudience"
                  value={formData.projectGoals.targetAudience}
                  onChange={(e) => updateProjectGoals('targetAudience', e.target.value)}
                  placeholder="Who will be using this application?"
                  className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30 min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="competitors" className="text-white/90">Similar Products or Competitors</Label>
                <Textarea 
                  id="competitors"
                  value={formData.projectGoals.competitors}
                  onChange={(e) => updateProjectGoals('competitors', e.target.value)}
                  placeholder="Any existing solutions or competitors you like?"
                  className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30 min-h-[80px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeline" className="text-white/90">Timeline</Label>
                  <Select
                    onValueChange={(value) => updateProjectGoals('timeline', value)}
                    defaultValue={formData.projectGoals.timeline}
                  >
                    <SelectTrigger className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30">
                      <SelectValue placeholder="Select your timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/80 border-white/20 text-white">
                      <SelectItem value="urgent">ASAP (1-2 weeks)</SelectItem>
                      <SelectItem value="short">Short term (1-2 months)</SelectItem>
                      <SelectItem value="medium">Medium term (3-6 months)</SelectItem>
                      <SelectItem value="long">Long term (6+ months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="budget" className="text-white/90">Budget Range</Label>
                  <Select
                    onValueChange={(value) => updateProjectGoals('budget', value)}
                    defaultValue={formData.projectGoals.budget}
                  >
                    <SelectTrigger className="bg-black/40 border-white/20 text-white/90 focus:border-siso-orange/70 focus:ring-siso-orange/30">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/80 border-white/20 text-white">
                      <SelectItem value="low">Under $5,000</SelectItem>
                      <SelectItem value="medium">$5,000 - $20,000</SelectItem>
                      <SelectItem value="high">$20,000 - $50,000</SelectItem>
                      <SelectItem value="enterprise">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Gem className="text-siso-orange h-6 w-6" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">Select Features</h2>
            </div>
            
            <p className="text-white/70 text-sm mb-4">
              Choose the features you need and assign a priority level to each feature. This will help us create a more accurate plan and cost estimation.
            </p>
            
            <div className="space-y-6">
              {/* Core Features */}
              <div>
                <h3 className="text-white/90 font-medium mb-3">Core Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featureOptions
                    .filter(feature => feature.category === 'core')
                    .map(feature => (
                      <div 
                        key={feature.id}
                        className={cn(
                          "relative border rounded-lg p-3 cursor-pointer transition-all duration-200",
                          formData.selectedFeatures.includes(feature.id)
                            ? "border-siso-orange/70 bg-black/50" 
                            : "border-white/10 bg-black/20 hover:border-white/30"
                        )}
                        onClick={() => toggleFeatureSelection(feature.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            "p-2 rounded-md",
                            formData.selectedFeatures.includes(feature.id)
                              ? "bg-gradient-to-br from-siso-red/20 to-siso-orange/20 text-siso-orange"
                              : "bg-black/20 text-white/50"
                          )}>
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-white/90">{feature.name}</h4>
                            <p className="text-sm text-white/60">{feature.description}</p>
                            
                            {formData.selectedFeatures.includes(feature.id) && (
                              <div className="mt-2">
                                <Select
                                  onValueChange={(value: any) => updateFeaturePriority(feature.id, value)}
                                  defaultValue={formData.featurePriorities[feature.id] || 'must-have'}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <SelectTrigger className="h-7 text-xs bg-black/40 border-white/20 text-white/90">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/80 border-white/20 text-white">
                                    <SelectItem value="must-have">Must Have</SelectItem>
                                    <SelectItem value="nice-to-have">Nice to Have</SelectItem>
                                    <SelectItem value="future">Future Phase</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {formData.selectedFeatures.includes(feature.id) && (
                          <div className="absolute top-2 right-2 text-siso-orange">
                            <CheckCircle size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Advanced Features */}
              <div>
                <h3 className="text-white/90 font-medium mb-3">Advanced Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featureOptions
                    .filter(feature => feature.category === 'advanced')
                    .map(feature => (
                      <div 
                        key={feature.id}
                        className={cn(
                          "relative border rounded-lg p-3 cursor-pointer transition-all duration-200",
                          formData.selectedFeatures.includes(feature.id)
                            ? "border-siso-orange/70 bg-black/50" 
                            : "border-white/10 bg-black/20 hover:border-white/30"
                        )}
                        onClick={() => toggleFeatureSelection(feature.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            "p-2 rounded-md",
                            formData.selectedFeatures.includes(feature.id)
                              ? "bg-gradient-to-br from-siso-red/20 to-siso-orange/20 text-siso-orange"
                              : "bg-black/20 text-white/50"
                          )}>
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-white/90">{feature.name}</h4>
                            <p className="text-sm text-white/60">{feature.description}</p>
                            
                            {formData.selectedFeatures.includes(feature.id) && (
                              <div className="mt-2">
                                <Select
                                  onValueChange={(value: any) => updateFeaturePriority(feature.id, value)}
                                  defaultValue={formData.featurePriorities[feature.id] || 'must-have'}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <SelectTrigger className="h-7 text-xs bg-black/40 border-white/20 text-white/90">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/80 border-white/20 text-white">
                                    <SelectItem value="must-have">Must Have</SelectItem>
                                    <SelectItem value="nice-to-have">Nice to Have</SelectItem>
                                    <SelectItem value="future">Future Phase</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {formData.selectedFeatures.includes(feature.id) && (
                          <div className="absolute top-2 right-2 text-siso-orange">
                            <CheckCircle size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Premium Features */}
              <div>
                <h3 className="text-white/90 font-medium mb-3">Premium Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featureOptions
                    .filter(feature => feature.category === 'premium')
                    .map(feature => (
                      <div 
                        key={feature.id}
                        className={cn(
                          "relative border rounded-lg p-3 cursor-pointer transition-all duration-200",
                          formData.selectedFeatures.includes(feature.id)
                            ? "border-siso-orange/70 bg-black/50" 
                            : "border-white/10 bg-black/20 hover:border-white/30"
                        )}
                        onClick={() => toggleFeatureSelection(feature.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            "p-2 rounded-md",
                            formData.selectedFeatures.includes(feature.id)
                              ? "bg-gradient-to-br from-siso-red/20 to-siso-orange/20 text-siso-orange"
                              : "bg-black/20 text-white/50"
                          )}>
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-white/90">{feature.name}</h4>
                            <p className="text-sm text-white/60">{feature.description}</p>
                            
                            {formData.selectedFeatures.includes(feature.id) && (
                              <div className="mt-2">
                                <Select
                                  onValueChange={(value: any) => updateFeaturePriority(feature.id, value)}
                                  defaultValue={formData.featurePriorities[feature.id] || 'must-have'}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <SelectTrigger className="h-7 text-xs bg-black/40 border-white/20 text-white/90">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/80 border-white/20 text-white">
                                    <SelectItem value="must-have">Must Have</SelectItem>
                                    <SelectItem value="nice-to-have">Nice to Have</SelectItem>
                                    <SelectItem value="future">Future Phase</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {formData.selectedFeatures.includes(feature.id) && (
                          <div className="absolute top-2 right-2 text-siso-orange">
                            <CheckCircle size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            
            {/* Feature count and estimated complexity */}
            <div className="bg-black/30 border border-white/10 rounded-lg p-4 mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-white/90 font-medium">Selected Features: {formData.selectedFeatures.length}</h4>
                  <p className="text-sm text-white/60">
                    {formData.selectedFeatures.filter(id => formData.featurePriorities[id] === 'must-have').length} must-have,&nbsp;
                    {formData.selectedFeatures.filter(id => formData.featurePriorities[id] === 'nice-to-have').length} nice-to-have,&nbsp;
                    {formData.selectedFeatures.filter(id => formData.featurePriorities[id] === 'future').length} future
                  </p>
                </div>
                <div className="bg-gradient-to-r from-siso-red/10 to-siso-orange/10 px-4 py-2 rounded-full border border-siso-orange/30">
                  <span className="text-sm font-medium bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
                    {formData.selectedFeatures.length <= 3 
                      ? "Simple Project" 
                      : formData.selectedFeatures.length <= 7 
                        ? "Medium Complexity" 
                        : "Complex Project"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl">
      {/* Progress bar */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex justify-between mb-2 text-xs text-white/70">
          <span>Step {currentStep} of 3</span>
          <span>{Math.round(calculateProgress())}% Complete</span>
        </div>
        <Progress value={calculateProgress()} className="h-2 bg-black/40" indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange" />
        
        <div className="flex justify-between items-center mt-4">
          {[1, 2, 3].map((step) => (
            <div 
              key={step}
              className="flex flex-col items-center"
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step < currentStep 
                    ? 'bg-gradient-to-r from-siso-red to-siso-orange text-white' 
                    : step === currentStep 
                      ? 'bg-black/50 text-white border border-siso-orange/70' 
                      : 'bg-black/30 text-white/50 border border-white/20'
                } shadow-lg transition-all duration-300`}
              >
                {step < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <div className="text-xs mt-1 text-white/70">
                {step === 1 && 'Company'}
                {step === 2 && 'Goals'}
                {step === 3 && 'Features'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Form content */}
      <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {renderStepContent()}
      </div>
      
      {/* Navigation buttons */}
      <div className="px-6 py-4 border-t border-white/10 flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              className="bg-black/40 border-white/20 hover:bg-black/60 hover:border-white/30 text-white group transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform duration-300" />
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-black/40"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          
          {currentStep < 3 ? (
            <Button
              variant="default"
              onClick={goToNextStep}
              className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white group transition-all duration-300"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit to AI'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
