
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { Button } from '@/components/ui/button';
import { FileCode, MoveRight } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function Index() {
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/plan-builder');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>SISO - AI-Powered App Development</title>
        <meta name="description" content="Transform your app ideas into reality with SISO's AI-powered development tools and resources." />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="py-20 lg:py-40 flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-siso-text-bold">AI-Powered</span>
              <span className="bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent block mt-2">App Development</span>
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed text-siso-text max-w-3xl mx-auto mb-8">
              Transform your app ideas into detailed development plans with our AI assistant. 
              Get comprehensive feature specifications, timelines, and budget estimates in minutes, 
              not weeks. The smarter way to plan your next software project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90"
                as={Link}
                to="/auth"
              >
                Get Started <MoveRight className="w-4 h-4" />
              </Button>
              
              <Button 
                size="lg" 
                className="gap-2" 
                variant="outline"
                as={Link}
                to="/plan-builder"
              >
                Try AI Project Planner <FileCode className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-16 w-full max-w-5xl">
            <div className="bg-siso-bg-alt border border-siso-border rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Why Choose SISO for App Development
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Generated Plans</h3>
                  <p className="text-siso-text-muted">Get detailed project plans, feature specifications, and timelines in minutes using AI.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Budget Optimization</h3>
                  <p className="text-siso-text-muted">Accurate cost estimates and resource planning to keep your project on budget.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
                  <p className="text-siso-text-muted">Comprehensive technical analysis and competitive recommendations for your app.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
