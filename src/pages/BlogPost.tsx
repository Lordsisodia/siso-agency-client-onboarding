
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1 p-8">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Blog Post Feature</h2>
            <p className="text-gray-400 max-w-md mb-8">
              This feature is currently unavailable.
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BlogPost;
