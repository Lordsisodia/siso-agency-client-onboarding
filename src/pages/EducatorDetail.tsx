
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEducatorDetails } from '@/hooks/education';

export default function EducatorDetail() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { loading } = useEducatorDetails(slug || '');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <div className="p-8 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm text-center">
          <h1 className="text-3xl font-bold mb-4">Educator Profile</h1>
          <p className="text-siso-text/70 mb-6">
            {loading 
              ? "Loading educator details..." 
              : "This feature is currently being updated. Please check back later."}
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
