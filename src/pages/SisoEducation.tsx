
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SisoEducation() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="p-8 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm text-center">
          <h1 className="text-3xl font-bold mb-4">Education Center</h1>
          <p className="text-siso-text/70 mb-6">
            This feature is currently being updated. Please check back later.
          </p>
          <Button 
            variant="default" 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-siso-red to-siso-orange"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
