
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Globe, Search, Loader2, CheckCircle } from 'lucide-react';
import { useClientAnalysis, ClientAnalysisResult, Message } from '@/hooks/use-client-analysis';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ClientOnboardingProps {
  onComplete?: (projectId: string) => void;
}

export function ClientOnboarding({ onComplete }: ClientOnboardingProps) {
  const [step, setStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [clientInfo, setClientInfo] = useState('');
  const [responseId, setResponseId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [businessData, setBusinessData] = useState<any>({
    companyName: '',
    industry: '',
    targetAudience: [],
    goals: '',
    features: { core: [], extras: [] }
  });
  const [isVerified, setIsVerified] = useState(false);
  
  const { analyzeClient, isLoading, error } = useClientAnalysis();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to start the analysis
  const handleStartAnalysis = async () => {
    // Initial prompt to analyze the website
    const initialPrompt = `
      I want you to analyze this client website and extract the following information:
      1. Company name
      2. Industry
      3. Target audience
      4. Business goals (if apparent)
      5. Current products or services
      6. Any existing features or functionality needs

      Analyze thoroughly and present your findings in a clear, structured format.
      After analysis, ask follow-up questions about areas that need clarification.
    `;

    const result = await analyzeClient(initialPrompt, websiteUrl);
    if (result) {
      setResponseId(result.responseId);
      setConversation([...result.messages]);
      setStep(2);
      
      // Try to extract business data from the analysis
      extractBusinessData(result);
    }
  };

  // Function to continue the conversation
  const handleContinueConversation = async () => {
    if (!clientInfo.trim() || !responseId) return;
    
    const result = await analyzeClient(clientInfo, undefined, responseId);
    if (result) {
      setConversation([...conversation, ...result.messages]);
      setClientInfo('');
      
      // Update business data with new insights
      extractBusinessData(result);
    }
  };

  // Function to verify and finalize the data
  const handleVerifyData = () => {
    setIsVerified(true);
    setStep(3);
  };

  // Function to create a new project with the collected data
  const handleCreateProject = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to create a project",
          variant: "destructive"
        });
        return;
      }

      // Create the project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: businessData.companyName || 'New Client Project',
          description: businessData.goals || 'Project created via AI onboarding'
        })
        .select('id')
        .single();

      if (projectError) {
        console.error("Error creating project:", projectError);
        toast({
          title: "Error",
          description: "Failed to create project. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Save the project details
      const { error: detailsError } = await supabase
        .from('project_details')
        .insert({
          project_id: project.id,
          business_context: {
            industry: businessData.industry || '',
            companyName: businessData.companyName || '',
            target_audience: businessData.targetAudience || []
          },
          goals: businessData.goals || '',
          features: {
            core: businessData.features?.core || [],
            extras: businessData.features?.extras || []
          }
        });

      if (detailsError) {
        console.error("Error saving project details:", detailsError);
        toast({
          title: "Warning",
          description: "Project created but some details couldn't be saved.",
          variant: "warning"
        });
      } else {
        toast({
          title: "Success",
          description: "Project successfully created!",
          variant: "default"
        });
      }

      // Navigate to the project page or call the completion handler
      if (onComplete) {
        onComplete(project.id);
      } else {
        navigate(`/project/${project.id}`);
      }
    } catch (error) {
      console.error("Error in project creation:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Extract business data from AI analysis
  const extractBusinessData = (result: ClientAnalysisResult) => {
    // Simple extraction based on text content
    // In a real implementation, this would be more sophisticated
    const content = result.messages[0]?.content || '';
    
    // Extract company name if not already set
    if (!businessData.companyName) {
      const companyMatch = content.match(/company name:?\s*([^\n]+)/i);
      if (companyMatch && companyMatch[1]) {
        setBusinessData(prev => ({ ...prev, companyName: companyMatch[1].trim() }));
      }
    }
    
    // Extract industry if not already set
    if (!businessData.industry) {
      const industryMatch = content.match(/industry:?\s*([^\n]+)/i);
      if (industryMatch && industryMatch[1]) {
        setBusinessData(prev => ({ ...prev, industry: industryMatch[1].trim() }));
      }
    }
    
    // Extract goals if not already set
    if (!businessData.goals) {
      const goalsMatch = content.match(/business goals:?\s*([^\n]+(?:\n[^\n]+)*)/i);
      if (goalsMatch && goalsMatch[1]) {
        setBusinessData(prev => ({ ...prev, goals: goalsMatch[1].trim() }));
      }
    }
    
    // Extract audience if not already set
    if (businessData.targetAudience.length === 0) {
      const audienceMatch = content.match(/target audience:?\s*([^\n]+(?:\n[^\n]+)*)/i);
      if (audienceMatch && audienceMatch[1]) {
        const audience = audienceMatch[1]
          .split(/[,;]/)
          .map(item => item.trim())
          .filter(item => item);
        setBusinessData(prev => ({ ...prev, targetAudience: audience }));
      }
    }
    
    // Extract features if not already populated
    if (businessData.features.core.length === 0) {
      const featuresMatch = content.match(/features:?\s*([^\n]+(?:\n[^\n]+)*)/i);
      if (featuresMatch && featuresMatch[1]) {
        const features = featuresMatch[1]
          .split(/[\n•-]/)
          .map(item => item.trim())
          .filter(item => item);
        setBusinessData(prev => ({ 
          ...prev, 
          features: { 
            ...prev.features,
            core: features.slice(0, Math.ceil(features.length / 2)), 
            extras: features.slice(Math.ceil(features.length / 2)) 
          } 
        }));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Website Analysis */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-background/60 backdrop-blur border-slate-800/30">
              <CardHeader>
                <CardTitle className="text-xl">Client Onboarding - Website Analysis</CardTitle>
                <CardDescription>
                  Provide your client's website URL to begin the analysis process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="website-url" className="text-sm font-medium">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="website-url"
                      placeholder="https://example.com"
                      className="pl-10"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 text-sm flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-amber-800 dark:text-amber-300">
                    <p>Our AI will analyze the website to extract business information and help you create a project.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleStartAnalysis} 
                  disabled={isLoading || !websiteUrl}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Website
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Conversation with AI */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-background/60 backdrop-blur border-slate-800/30">
              <CardHeader>
                <CardTitle className="text-xl">Client Information Gathering</CardTitle>
                <CardDescription>
                  Our AI is analyzing your client's needs based on their website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-[400px] overflow-y-auto p-4 bg-muted/30 rounded-lg space-y-4">
                  {/* Display conversation */}
                  {conversation.map((message, idx) => (
                    <div key={idx} className="break-words">
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Display any annotations (web search results) */}
                      {message.annotations && message.annotations.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-800/20">
                          <p className="text-xs text-muted-foreground mb-1">Sources:</p>
                          <ul className="text-xs space-y-1">
                            {message.annotations.map((annotation, i) => (
                              <li key={i}>
                                <a 
                                  href={annotation.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline flex items-center"
                                >
                                  <span className="truncate">{annotation.title}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analyzing...</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="client-info" className="text-sm font-medium">
                    Provide additional information
                  </label>
                  <Textarea
                    id="client-info"
                    placeholder="Share more details about your client's needs..."
                    value={clientInfo}
                    onChange={(e) => setClientInfo(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={handleContinueConversation} 
                  disabled={isLoading || !clientInfo.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Send'
                  )}
                </Button>
                
                <Button 
                  onClick={handleVerifyData}
                  variant="outline"
                >
                  Continue to Project Creation
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Verify and Create Project */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-background/60 backdrop-blur border-slate-800/30">
              <CardHeader>
                <CardTitle className="text-xl">Verify Project Information</CardTitle>
                <CardDescription>
                  Review and confirm the details before creating the project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input 
                      value={businessData.companyName} 
                      onChange={(e) => setBusinessData({...businessData, companyName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industry</label>
                    <Input 
                      value={businessData.industry} 
                      onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Goals</label>
                  <Textarea 
                    value={businessData.goals} 
                    onChange={(e) => setBusinessData({...businessData, goals: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Audience</label>
                  <Input 
                    value={businessData.targetAudience.join(', ')} 
                    onChange={(e) => setBusinessData({
                      ...businessData, 
                      targetAudience: e.target.value.split(',').map((item: string) => item.trim())
                    })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Core Features</label>
                    <Textarea 
                      value={businessData.features.core.join('\n')} 
                      onChange={(e) => setBusinessData({
                        ...businessData, 
                        features: {
                          ...businessData.features,
                          core: e.target.value.split('\n').map((item: string) => item.trim()).filter(Boolean)
                        }
                      })}
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Extra Features</label>
                    <Textarea 
                      value={businessData.features.extras.join('\n')} 
                      onChange={(e) => setBusinessData({
                        ...businessData, 
                        features: {
                          ...businessData.features,
                          extras: e.target.value.split('\n').map((item: string) => item.trim()).filter(Boolean)
                        }
                      })}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleCreateProject} 
                  disabled={isLoading || !businessData.companyName}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Project...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Create Project
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
