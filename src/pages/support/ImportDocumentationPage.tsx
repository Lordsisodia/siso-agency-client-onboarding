
import React, { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { importTestDocumentation } from '@/services/supabase-documentation.service';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ImportDocumentationPage = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handleImport = async () => {
    setIsImporting(true);
    
    try {
      const success = await importTestDocumentation();
      
      if (success) {
        toast({
          title: "Documentation imported successfully",
          description: "The test documentation data has been imported into the database.",
          variant: "default",
        });
        setIsComplete(true);
      } else {
        toast({
          title: "Import failed",
          description: "There was an error importing the documentation data.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error during import:', error);
      toast({
        title: "Import failed",
        description: "There was an error importing the documentation data.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Import Documentation Data</h1>
          
          <Card className="p-6">
            <div className="space-y-4">
              <p className="text-lg">
                This page allows you to import test documentation data into the database. 
                This will create categories, articles, sections, and questions for testing purposes.
              </p>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-amber-700">
                <p className="font-medium">Warning</p>
                <p>This action will trigger the Edge Function to import documentation data. Only use this for testing purposes.</p>
              </div>
              
              {isComplete ? (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 text-green-700">
                  <p className="font-medium">Success!</p>
                  <p>Documentation data has been successfully imported.</p>
                </div>
              ) : (
                <Button 
                  onClick={handleImport} 
                  disabled={isImporting}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    'Import Documentation Data'
                  )}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ImportDocumentationPage;
