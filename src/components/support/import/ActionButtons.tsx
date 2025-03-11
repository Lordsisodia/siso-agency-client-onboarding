
import React from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ActionButtonsProps = {
  isImporting: boolean;
  onImport: () => void;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  isImporting, 
  onImport 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={() => navigate('/support')}
      >
        Back to Help Center
      </Button>
      
      <Button
        onClick={onImport}
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
  );
};
