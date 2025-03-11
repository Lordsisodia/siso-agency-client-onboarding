
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowRight, CheckCircle, AlertCircle, LoaderCircle, Database, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { importTestDocumentation } from '@/services/supabase-documentation.service';
import { useToast } from '@/hooks/use-toast';

const ImportDocumentationPage: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [useExpandedData, setUseExpandedData] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImportData = async () => {
    setIsImporting(true);
    setImportSuccess(null);
    setErrorMessage(null);
    
    try {
      console.log("Starting documentation import with expanded data:", useExpandedData);
      const success = await importTestDocumentation(useExpandedData);
      
      setImportSuccess(success);
      
      if (success) {
        console.log("Import completed successfully");
        toast({
          title: "Import successful",
          description: `Documentation data has been imported successfully using the ${useExpandedData ? 'expanded' : 'standard'} dataset.`,
          variant: "default",
        });
      } else {
        console.error("Import failed - returned false");
        setErrorMessage("The import process returned a failure status. Please try again.");
        toast({
          title: "Import failed",
          description: "There was an error importing the documentation data.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error importing documentation:', error);
      setImportSuccess(false);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred during import");
      
      toast({
        title: "Import error",
        description: "An unexpected error occurred during import.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  // Check if import has been attempted before
  useEffect(() => {
    const checkImportStatus = async () => {
      try {
        const response = await fetch('/api/import-documentation-status');
        if (response.ok) {
          const data = await response.json();
          if (data.hasImported) {
            toast({
              title: "Data already exists",
              description: "Documentation data has already been imported. You can reimport to refresh the data.",
              variant: "default",
            });
          }
        }
      } catch (error) {
        console.error("Failed to check import status:", error);
      }
    };
    
    // Uncomment this to add the check functionality later
    // checkImportStatus();
  }, [toast]);

  const handleRetry = () => {
    setImportSuccess(null);
    setErrorMessage(null);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-siso-border">
            <CardHeader>
              <CardTitle className="text-2xl">Import Documentation Data</CardTitle>
              <CardDescription>
                Use this tool to import sample documentation content for development and testing purposes.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-siso-bg-alt/20 rounded-lg p-4 border border-siso-border/40">
                <h3 className="font-medium mb-2">What this will do:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-siso-text/70">
                  <li>Import predefined documentation categories</li>
                  <li>Create sample articles with sections and questions</li>
                  <li>Populate the help center with test content</li>
                  <li>Skip any existing categories to prevent duplicates</li>
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="expanded-mode" className="text-sm font-medium">
                    Use expanded documentation dataset
                  </Label>
                  <span className="text-xs text-siso-text/60">
                    Includes more categories and detailed Q&A content
                  </span>
                </div>
                <Switch 
                  id="expanded-mode" 
                  checked={useExpandedData} 
                  onCheckedChange={setUseExpandedData}
                />
              </div>
              
              {importSuccess === true && (
                <Alert className="bg-green-500/10 border-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-500">Import Successful</AlertTitle>
                  <AlertDescription className="text-siso-text/80">
                    Documentation data has been imported successfully. You can now view the content in the help center.
                  </AlertDescription>
                </Alert>
              )}
              
              {importSuccess === false && (
                <Alert className="bg-red-500/10 border-red-500/20">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertTitle className="text-red-500">Import Failed</AlertTitle>
                  <AlertDescription className="text-siso-text/80">
                    <p>There was an error importing the documentation data.</p>
                    {errorMessage && <p className="mt-1 font-mono text-xs">{errorMessage}</p>}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRetry}
                      className="mt-2"
                    >
                      <RefreshCw className="mr-2 h-3 w-3" />
                      Try Again
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate('/support')}
                >
                  Back to Help Center
                </Button>
                
                <Button
                  onClick={handleImportData}
                  disabled={isImporting}
                  className="bg-siso-blue hover:bg-siso-blue/90"
                >
                  {isImporting ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      Import Documentation
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ImportDocumentationPage;
