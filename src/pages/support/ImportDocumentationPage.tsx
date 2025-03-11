
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { importTestDocumentation } from '@/services/supabase-documentation.service';
import { useToast } from '@/hooks/use-toast';

// Import refactored components
import { InfoBox } from '@/components/support/import/InfoBox';
import { DatasetToggle } from '@/components/support/import/DatasetToggle';
import { ImportStatusAlert } from '@/components/support/import/ImportStatusAlert';
import { ActionButtons } from '@/components/support/import/ActionButtons';

const ImportDocumentationPage: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [useExpandedData, setUseExpandedData] = useState(true);
  const [detailedErrorInfo, setDetailedErrorInfo] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImportData = async () => {
    setIsImporting(true);
    setImportSuccess(null);
    setErrorMessage(null);
    setDetailedErrorInfo(null);
    
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
      
      // Provide more detailed error information
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred during import";
      setErrorMessage(errorMsg);
      
      // Extract and format the stack trace if available
      if (error instanceof Error && error.stack) {
        setDetailedErrorInfo(error.stack);
      }
      
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
    setDetailedErrorInfo(null);
  };

  // Content for the info box
  const infoBoxItems = [
    "Import predefined documentation categories",
    "Create sample articles with sections and questions",
    "Populate the help center with test content",
    "Skip any existing categories to prevent duplicates"
  ];

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
              <InfoBox title="What this will do:" items={infoBoxItems} />
              
              <DatasetToggle 
                useExpandedData={useExpandedData} 
                onToggle={setUseExpandedData} 
              />
              
              <ImportStatusAlert 
                importSuccess={importSuccess}
                errorMessage={errorMessage}
                detailedErrorInfo={detailedErrorInfo}
                onRetry={handleRetry}
              />
              
              <ActionButtons 
                isImporting={isImporting} 
                onImport={handleImportData} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ImportDocumentationPage;
