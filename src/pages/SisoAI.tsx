
import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, RefreshCw, Users, ArrowRight } from 'lucide-react';

export default function SisoAI() {
  useEffect(() => {
    document.title = 'Siso AI | SISO Platform';
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 overflow-auto bg-background">
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Siso AI</h1>
              <p className="text-muted-foreground mt-2">
                Access powerful AI tools to enhance your business planning and execution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Zap className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">AI Business Assistant</h3>
                <p className="text-muted-foreground flex-1">
                  Get personalized insights and recommendations for your business projects.
                </p>
                <Button className="mt-2 w-full">
                  Start Conversation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>

              <Card className="p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <RefreshCw className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Content Generator</h3>
                <p className="text-muted-foreground flex-1">
                  Generate marketing copy, business plans, and project documentation.
                </p>
                <Button className="mt-2 w-full">
                  Generate Content <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>

              <Card className="p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Market Analyzer</h3>
                <p className="text-muted-foreground flex-1">
                  Analyze market trends and competitive landscape for your industry.
                </p>
                <Button className="mt-2 w-full">
                  Analyze Market <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </div>

            <Card className="p-6 mt-4">
              <h3 className="text-xl font-semibold mb-4">Recent AI Interactions</h3>
              <p className="text-muted-foreground">
                You don't have any recent AI interactions. Start a conversation to see your history here.
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
