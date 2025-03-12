
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ConnectionErrorAlertProps {
  errorMessage: string | null;
}

export const ConnectionErrorAlert: React.FC<ConnectionErrorAlertProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Error</AlertTitle>
      <AlertDescription>
        {errorMessage}
      </AlertDescription>
    </Alert>
  );
};
