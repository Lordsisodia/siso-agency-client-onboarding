
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ImportStatusAlertProps = {
  importSuccess: boolean | null;
  errorMessage: string | null;
  detailedErrorInfo: string | null;
  onRetry: () => void;
};

export const ImportStatusAlert: React.FC<ImportStatusAlertProps> = ({
  importSuccess,
  errorMessage,
  detailedErrorInfo,
  onRetry
}) => {
  if (importSuccess === null) return null;

  if (importSuccess) {
    return (
      <Alert className="bg-green-500/10 border-green-500/20">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-500">Import Successful</AlertTitle>
        <AlertDescription className="text-siso-text/80">
          Documentation data has been imported successfully. You can now view the content in the help center.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-red-500/10 border-red-500/20">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertTitle className="text-red-500">Import Failed</AlertTitle>
      <AlertDescription className="text-siso-text/80">
        <p>There was an error importing the documentation data.</p>
        {errorMessage && <p className="mt-1 text-sm">{errorMessage}</p>}
        
        {detailedErrorInfo && (
          <details className="mt-2">
            <summary className="cursor-pointer text-xs flex items-center">
              <Info className="h-3 w-3 mr-1" /> Technical details
            </summary>
            <pre className="mt-1 text-xs bg-black/10 p-2 rounded overflow-auto max-h-28">
              {detailedErrorInfo}
            </pre>
          </details>
        )}
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRetry}
          className="mt-3"
        >
          <RefreshCw className="mr-2 h-3 w-3" />
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  );
};
