
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface CompanyImageUploadProps {
  userId: string;
  type: 'logo' | 'banner';
  currentUrl?: string | null;
  onUploadComplete?: (url: string) => void;
}

export const CompanyImageUpload = ({ userId, type, currentUrl, onUploadComplete }: CompanyImageUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select an image under 5MB"
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const filePath = `company-profiles/${type}-${userId}-${Date.now()}.${fileExt}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
      
      const publicUrl = data.publicUrl;

      // Update the company profile
      const fieldName = type === 'logo' ? 'logo_url' : 'banner_url';
      const { error: updateError } = await supabase
        .from('company_profiles')
        .update({ [fieldName]: publicUrl })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      toast({
        title: "Upload successful",
        description: `Your ${type} has been updated`,
      });

      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }
    } catch (error: any) {
      console.error(`Error uploading ${type}:`, error);
      toast({
        variant: "destructive",
        title: `Error uploading ${type}`,
        description: error.message,
      });
      // Revert preview
      setPreviewUrl(currentUrl);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Label className="text-lg font-semibold text-siso-text-bold mb-4 flex items-center">
        <ImageIcon className="w-5 h-5 mr-2 text-siso-orange" />
        {type === 'logo' ? 'Company Logo' : 'Company Banner'}
      </Label>

      {previewUrl ? (
        <div className="relative w-full h-40 mb-4 group">
          <img 
            src={previewUrl} 
            alt={type === 'logo' ? 'Company Logo' : 'Company Banner'} 
            className={`w-full h-full ${type === 'logo' ? 'object-contain bg-black/40 p-4' : 'object-cover'} rounded-lg`} 
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
            <p className="text-white text-sm">Click button below to change</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-40 mb-4 border-2 border-dashed border-siso-orange/20 rounded-lg flex items-center justify-center bg-black/20">
          <div className="text-center text-siso-text/70">
            <ImageIcon className="w-10 h-10 mb-2 mx-auto text-siso-orange/50" />
            <p>No {type === 'logo' ? 'logo' : 'banner'} uploaded</p>
          </div>
        </div>
      )}

      <div className="w-full">
        <input
          type="file"
          id={`${type}-upload`}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Label htmlFor={`${type}-upload`} className="w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-siso-orange/10 text-siso-orange border-siso-orange/30 hover:bg-siso-orange/20"
            disabled={isUploading}
            asChild
          >
            <span>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {previewUrl ? `Change ${type}` : `Upload ${type}`}
                </>
              )}
            </span>
          </Button>
        </Label>
        <p className="text-xs text-siso-text/50 mt-2 text-center">
          Recommended: {type === 'logo' ? 'Square image, 400x400px' : 'Banner image, 1200x300px'}
        </p>
      </div>
    </motion.div>
  );
};
