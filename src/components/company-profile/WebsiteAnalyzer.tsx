
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Globe, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { extractDomain } from '@/lib/utils';

interface WebsiteAnalyzerProps {
  onAnalysisComplete: (data: any) => void;
}

export const WebsiteAnalyzer = ({ onAnalysisComplete }: WebsiteAnalyzerProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisSuccess, setAnalysisSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a website URL to analyze",
        variant: "destructive"
      });
      return;
    }

    let processedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      processedUrl = 'https://' + url;
    }

    setIsAnalyzing(true);
    setAnalysisSuccess(false);

    try {
      const { data, error } = await supabase.functions
        .invoke('analyze-website', {
          body: { url: processedUrl }
        });

      if (error) throw error;

      if (data.success) {
        setAnalysisSuccess(true);
        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${extractDomain(processedUrl)}`
        });
        
        // Process the data and call the callback
        onAnalysisComplete(data);
      } else {
        throw new Error(data.error || "Failed to analyze website");
      }
    } catch (error: any) {
      console.error("Error analyzing website:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Could not analyze this website",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <Globe className="w-5 h-5 text-siso-orange mr-2" />
        <h3 className="text-xl font-semibold text-siso-text-bold">Website Analyzer</h3>
      </div>
      
      <p className="text-siso-text/70 mb-4">
        Enter your company website URL and we'll automatically extract information to help complete your profile.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="www.yourcompany.com"
            className="flex-grow p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
            disabled={isAnalyzing}
          />
          <Button
            type="submit"
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Website
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
      
      {isAnalyzing && (
        <div className="mt-4 text-center text-siso-text/70">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-siso-orange" />
          <p>Analyzing your website. This may take a few moments...</p>
        </div>
      )}

      {analysisSuccess && (
        <motion.div 
          className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-500">Analysis Complete</h4>
            <p className="text-sm text-siso-text/80">
              Website information has been extracted and applied to the form below. 
              Please review and edit as needed before saving your profile.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
