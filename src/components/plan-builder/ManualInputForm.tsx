
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, ChevronRight, ChevronLeft, Building, Globe, Target, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface ManualInputFormProps {
  onClose: () => void;
  onSubmitToAI: (prompt: string, formData: Record<string, any>) => Promise<void>;
}

interface FeatureOption {
  id: string;
  name: string;
  description: string;
  category: string;
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

  const goToNextStep = () => {
    if (step < 3) {
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
      {/* Progress Bar */}
      <div className="w-full bg-background">
        <div className="flex items-center justify-between text-sm font-medium px-4 py-2">
          <div className="w-full flex items-center justify-between">
            <div 
              className={`flex items-center gap-2 ${step === 1 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                1
              </span>
              <span>Company Identity</span>
            </div>
            <div className={`h-1 w-12 mx-2 ${step > 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div 
              className={`flex items-center gap-2 ${step === 2 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                2
              </span>
              <span>Project Goals</span>
            </div>
            <div className={`h-1 w-12 mx-2 ${step > 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div 
              className={`flex items-center gap-2 ${step === 3 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                3
              </span>
              <span>Feature Selection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 bg-card">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Tell us about your company</h2>
              <p className="text-muted-foreground">Let's start with some basic information</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Inc."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="websiteUrl" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website or Social Media URL
                </Label>
                <Input
                  id="websiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="e.g. https://example.com"
                  type="url"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessType" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Business Type
                </Label>
                <Input
                  id="businessType"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g. E-commerce, Healthcare, Education"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Define your project goals</h2>
              <p className="text-muted-foreground">Help us understand what you want to achieve</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectGoal" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  What's your main goal for this project? <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="projectGoal"
                  value={projectGoal}
                  onChange={(e) => setProjectGoal(e.target.value)}
                  placeholder="e.g. Increase sales by creating an online store, automate our customer support..."
                  className="min-h-24"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Who is your target audience?
                </Label>
                <Textarea
                  id="targetAudience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Small business owners, retail customers, teenagers..."
                  className="min-h-20"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeframe" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Project Timeframe
                  </Label>
                  <Input
                    id="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    placeholder="e.g. 3 months, by end of year"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budgetRange" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget Range
                  </Label>
                  <Input
                    id="budgetRange"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    placeholder="e.g. $5,000-$10,000, Under $50,000"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Select features for your app</h2>
              <p className="text-muted-foreground">Choose features and set their priorities</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pb-4 pr-2">
              {featureOptions.map((feature) => (
                <Card 
                  key={feature.id} 
                  className={`border ${selectedFeatures[feature.id].selected ? 'border-primary' : 'border-border'}`}
                >
                  <CardHeader className="py-4 px-4">
                    <CardTitle className="text-base flex justify-between items-start">
                      <span>{feature.name}</span>
                      <Checkbox 
                        id={`feature-${feature.id}`}
                        checked={selectedFeatures[feature.id].selected}
                        onCheckedChange={() => handleFeatureSelection(feature.id)}
                      />
                    </CardTitle>
                    <CardDescription className="text-xs">{feature.description}</CardDescription>
                  </CardHeader>
                  {selectedFeatures[feature.id].selected && (
                    <CardFooter className="py-2 px-4 flex justify-between border-t">
                      <span className="text-xs">Priority:</span>
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          size="sm" 
                          variant={selectedFeatures[feature.id].priority === "must-have" ? "default" : "outline"}
                          onClick={() => handlePriorityChange(feature.id, "must-have")}
                          className="text-xs h-7 px-2"
                        >
                          Must-have
                        </Button>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant={selectedFeatures[feature.id].priority === "nice-to-have" ? "default" : "outline"}
                          onClick={() => handlePriorityChange(feature.id, "nice-to-have")}
                          className="text-xs h-7 px-2"
                        >
                          Nice-to-have
                        </Button>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t bg-muted/50 flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          
          {step > 1 && (
            <Button variant="outline" onClick={goToPreviousStep} disabled={isSubmitting}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          {step < 3 ? (
            <Button 
              onClick={goToNextStep} 
              disabled={!isStepComplete() || isSubmitting}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={!isStepComplete() || isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Create AI Plan"}
              <Check className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Pre-defined feature options for selection
const featureOptions: FeatureOption[] = [
  {
    id: "auth",
    name: "User Authentication",
    description: "User registration, login, and profile management",
    category: "Users & Authentication"
  },
  {
    id: "roles",
    name: "User Roles & Permissions",
    description: "Different access levels and permissions for users",
    category: "Users & Authentication"
  },
  {
    id: "payments",
    name: "Payment Processing",
    description: "Ability to accept payments and manage transactions",
    category: "E-commerce"
  },
  {
    id: "cart",
    name: "Shopping Cart",
    description: "Allow users to add items and checkout",
    category: "E-commerce"
  },
  {
    id: "inventory",
    name: "Inventory Management",
    description: "Track and manage product inventory",
    category: "E-commerce"
  },
  {
    id: "search",
    name: "Search Functionality",
    description: "Allow users to search content within the app",
    category: "Content"
  },
  {
    id: "notifications",
    name: "Notifications",
    description: "Send alerts and notifications to users",
    category: "Communication"
  },
  {
    id: "messaging",
    name: "Messaging/Chat",
    description: "Allow users to communicate with each other",
    category: "Communication"
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Track and visualize user activity and business metrics",
    category: "Admin"
  },
  {
    id: "admin",
    name: "Admin Portal",
    description: "Backend interface for managing the application",
    category: "Admin"
  },
  {
    id: "file-upload",
    name: "File Upload & Storage",
    description: "Allow users to upload and store files",
    category: "Content"
  },
  {
    id: "social",
    name: "Social Media Integration",
    description: "Connect with social platforms for sharing or login",
    category: "Integration"
  },
  {
    id: "mobile",
    name: "Mobile App Version",
    description: "Native mobile application for iOS/Android",
    category: "Platform"
  },
  {
    id: "offline",
    name: "Offline Functionality",
    description: "App works without internet connection",
    category: "Technical"
  },
  {
    id: "ai",
    name: "AI/ML Features",
    description: "Smart features powered by artificial intelligence",
    category: "Technical"
  },
  {
    id: "reports",
    name: "Reporting & Exports",
    description: "Generate reports and export data",
    category: "Content"
  }
];
