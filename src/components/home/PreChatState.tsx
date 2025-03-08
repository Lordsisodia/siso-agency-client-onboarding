
import { motion } from 'framer-motion';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { Button } from '@/components/ui/button';
import { FileText, Phone } from 'lucide-react';
import { useState } from 'react';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';

interface PreChatStateProps {
  handleSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
  searchPlaceholders?: string[];
  titleText?: string;
  subtitleText?: string;
}

export const PreChatState = ({ 
  handleSubmit, 
  isLoading, 
  searchPlaceholders = [
    "How can AI help my business grow?",
    "What tools do you recommend for automation?",
    "How to implement AI in my workflow?",
    "Best practices for agency scaling",
    "Latest AI trends for agencies",
  ],
  titleText = "Welcome to SISO Resources",
  subtitleText = "Ask questions about tools, strategies, and resources to grow your agency business with AI."
}: PreChatStateProps) => {
  const [isManualInputOpen, setIsManualInputOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search input changed:', e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.querySelector('input')?.value;
    if (message?.trim()) {
      handleSubmit(message.trim());
    }
  };

  const handleManualSubmit = async (prompt: string, formData?: Record<string, any>) => {
    await handleSubmit(prompt);
  };

  const openManualInput = () => {
    setIsManualInputOpen(true);
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-4"
      >
        <div
          className="mb-8"
        >
          <img 
            src="/lovable-uploads/dee36671-c662-422f-a9a0-deb2eeb03973.png" 
            alt="SISO Lion Logo" 
            className="w-24 h-24 object-contain rounded-full bg-black/40 p-2 border border-white/20 shadow-lg"
          />
        </div>

        <h1
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center"
        >
          <span className="bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
            {titleText}
          </span>
        </h1>

        <p
          className="text-center text-white/80 mb-8 max-w-2xl"
        >
          {subtitleText}
        </p>

        <div
          className="w-full max-w-xl"
        >
          <PlaceholdersAndVanishInput 
            placeholders={searchPlaceholders}
            onChange={handleInputChange}
            onSubmit={handleInputSubmit}
            className="bg-black/40 border-white/20 focus:border-siso-orange/60 text-white placeholder-gray-400 shadow-lg"
          />
        </div>

        {/* Additional buttons */}
        <div 
          className="flex gap-3 mt-6 justify-center"
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/40 border-white/20 hover:bg-black/60 hover:border-siso-orange/50 hover:text-siso-orange text-white flex items-center gap-2 transition-all duration-300"
            onClick={openManualInput}
          >
            <FileText size={16} />
            <span>Manual Input</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/40 border-white/20 hover:bg-black/60 text-white flex items-center gap-2 relative overflow-hidden transition-all duration-300"
            disabled
          >
            <Phone size={16} />
            <span>Phone Call</span>
            <span className="absolute -right-1 -top-1 bg-siso-red/80 text-white text-[10px] px-2 py-0.5 rotate-12 shadow-md">
              Soon
            </span>
          </Button>
        </div>
      </div>

      {/* Manual Input Sheet */}
      <ManualInputSheet 
        isOpen={isManualInputOpen}
        onClose={() => setIsManualInputOpen(false)}
        onSubmitToAI={handleManualSubmit}
      />
    </>
  );
};
