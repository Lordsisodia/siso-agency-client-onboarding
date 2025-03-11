
import React, { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const ImportDocumentation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleImport = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('https://wnwhlqmeshtreeebxior.supabase.co/functions/v1/import-documentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Documentation imported successfully!'
        });
      } else {
        setResult({
          success: false,
          error: data.error || 'Failed to import documentation.'
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'An unexpected error occurred.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Import Documentation Data</CardTitle>
            <CardDescription>
              This utility will import test documentation articles, sections, and questions into your Supabase database.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result && (
              <Alert className={`mb-6 ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>{result.success ? 'Success!' : 'Error'}</AlertTitle>
                <AlertDescription>
                  {result.success ? result.message : result.error}
                </AlertDescription>
              </Alert>
            )}
            
            <p className="text-sm text-siso-text/70 mb-4">
              This process may take a few minutes. The Edge Function will create test articles, sections, and questions
              for each documentation category in your database.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800">
              <strong>Note:</strong> If you run this multiple times, duplicate entries may be created. It's best to run this only once.
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleImport} 
              disabled={isLoading} 
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing Documentation...
                </>
              ) : (
                'Import Documentation'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ImportDocumentation;
