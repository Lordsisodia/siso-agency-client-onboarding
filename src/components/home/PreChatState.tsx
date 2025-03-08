
import { motion } from 'framer-motion';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Button } from '@/components/ui/button';
import { FileText, Phone } from 'lucide-react';

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

  return (
    <motion.div
      key="initial"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-4"
    >
      <motion.div
        className="mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/lovable-uploads/dee36671-c662-422f-a9a0-deb2eeb03973.png" 
          alt="SISO Lion Logo" 
          className="w-24 h-24 object-contain rounded-full bg-black/30 p-2 border border-white/10"
        />
      </motion.div>

      <motion.h1
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
          {titleText}
        </span>
      </motion.h1>

      <motion.p
        className="text-center text-siso-text/80 mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {subtitleText}
      </motion.p>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <PlaceholdersAndVanishInput 
          placeholders={searchPlaceholders}
          onChange={handleInputChange}
          onSubmit={handleInputSubmit}
          className="bg-black/30 border-white/10 focus:border-siso-orange/50 text-white placeholder-gray-400"
        />
      </motion.div>

      {/* Additional buttons */}
      <motion.div 
        className="flex gap-3 mt-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-black/30 border-white/10 hover:bg-black/50 hover:text-siso-orange text-white flex items-center gap-2"
          onClick={() => console.log("Manual input clicked")}
        >
          <FileText size={16} />
          <span>Manual Input</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-black/30 border-white/10 hover:bg-black/50 text-white flex items-center gap-2 relative overflow-hidden"
          disabled
        >
          <Phone size={16} />
          <span>Phone Call</span>
          <span className="absolute -right-1 -top-1 bg-siso-red/80 text-white text-[10px] px-2 py-0.5 rotate-12 shadow-md">
            Soon
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
