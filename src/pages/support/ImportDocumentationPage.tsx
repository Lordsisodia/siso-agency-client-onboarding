
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const ImportDocumentationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-siso-border">
            <CardHeader>
              <CardTitle className="text-2xl">Help Center Documentation</CardTitle>
              <CardDescription>
                Information about the documentation system in this application.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-500">Static Documentation System</AlertTitle>
                <AlertDescription className="text-siso-text/80">
                  This application now uses a static documentation system built into the application itself, 
                  eliminating the need for database imports. All help center content is pre-loaded and 
                  available immediately.
                </AlertDescription>
              </Alert>
              
              <div className="bg-siso-bg-alt/20 rounded-lg p-4 border border-siso-border/40">
                <h3 className="font-medium mb-2">Benefits of Static Documentation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-siso-text/70">
                  <li>Faster page loads with no database queries</li>
                  <li>Works offline and in development environments</li>
                  <li>Simpler maintenance and version control</li>
                  <li>No import/export process required</li>
                  <li>Content updates can be tracked in source control</li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate('/support')}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Help Center
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
