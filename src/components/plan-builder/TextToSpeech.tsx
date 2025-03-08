
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TextToSpeechProps {
  text: string;
  voice?: string;
}

export function TextToSpeech({ text, voice = 'alloy' }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const audioRef = useState<HTMLAudioElement | null>(null);

  const speakText = async () => {
    if (!text) return;
    
    // If already playing, stop the audio
    if (isPlaying && audioRef[0]) {
      audioRef[0].pause();
      audioRef[0] = null;
      setIsPlaying(false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice }
      });
      
      if (error) throw error;
      
      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audioRef[0] = audio;
        
        audio.onended = () => {
          setIsPlaying(false);
        };
        
        audio.oncanplaythrough = () => {
          audio.play();
          setIsPlaying(true);
          setIsLoading(false);
        };
        
        audio.onerror = () => {
          setIsPlaying(false);
          setIsLoading(false);
          toast({
            title: 'Playback Error',
            description: 'There was an error playing the audio',
            variant: 'destructive',
          });
        };
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast({
        title: 'Speech Synthesis Error',
        description: 'Failed to convert text to speech',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={speakText}
      disabled={!text || isLoading}
      variant="ghost"
      size="sm"
      className="rounded-full w-8 h-8 p-0"
      title={isPlaying ? "Stop speaking" : "Listen"}
    >
      {isLoading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
}
