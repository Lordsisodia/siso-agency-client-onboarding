
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export function AssistantSetup() {
  const [isCreating, setIsCreating] = useState(false);
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { toast } = useToast();

  const createAssistant = async () => {
    setIsCreating(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-openai-assistant', {
        // No body needed for this function
      });
      
      if (error) {
        throw new Error(`Error creating assistant: ${error.message}`);
      }
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create assistant');
      }
      
      setAssistantId(data.assistant_id);
      setSuccess(true);
      
      toast({
        title: "Assistant Created",
        description: `Successfully created assistant with ID: ${data.assistant_id}`,
      });
      
      // Copy to clipboard
      navigator.clipboard.writeText(data.assistant_id)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Assistant ID has been copied to your clipboard",
          });
        })
        .catch(err => {
          console.error("Failed to copy to clipboard:", err);
        });
      
    } catch (err) {
      console.error("Error creating assistant:", err);
      setError(err.message || 'An unknown error occurred');
      
      toast({
        title: "Error Creating Assistant",
        description: err.message || 'Failed to create the OpenAI assistant',
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>OpenAI Assistant Setup</CardTitle>
        <CardDescription>
          Create a new OpenAI Project Planning Assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {success ? (
          <Alert variant="success" className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Assistant Created</AlertTitle>
            <AlertDescription>
              <p>Your assistant has been created successfully!</p>
              <p className="mt-2 font-mono text-sm bg-slate-100 p-2 rounded">
                {assistantId}
              </p>
              <p className="mt-2 text-sm">
                Please save this ID and update the PLAN_BUILDER_ASSISTANT_ID in your Supabase Edge Function secrets.
              </p>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="py-2">
              <p className="text-sm text-gray-600 mb-4">
                This will create a new OpenAI Assistant with all the proper settings for the
                project planning assistant feature. You'll need to add the created assistant ID
                to your Supabase Edge Function secrets.
              </p>
              
              <Button 
                onClick={createAssistant} 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Assistant...
                  </>
                ) : (
                  'Create Assistant'
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
