
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

export const useProfileImage = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadAvatar = async (file: File, userId: string): Promise<string | null> => {
    try {
      setUploading(true);
      
      if (!file) {
        throw new Error('You must select an image to upload.');
      }
      
      // Limit file size to 2MB
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('File size must be less than 2MB');
      }
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}-avatar-${uuidv4()}.${fileExt}`;
      
      // Upload the image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', userId);
        
      if (updateError) {
        throw updateError;
      }
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully",
      });
      
      return filePath;
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message,
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadBanner = async (file: File, userId: string): Promise<string | null> => {
    try {
      setUploading(true);
      
      if (!file) {
        throw new Error('You must select an image to upload.');
      }
      
      // Limit file size to 5MB for banners
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}-banner-${uuidv4()}.${fileExt}`;
      
      // Upload the image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars') // Using the same bucket for simplicity
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Update the user's profile with the new banner URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: filePath })
        .eq('id', userId);
        
      if (updateError) {
        throw updateError;
      }
      
      toast({
        title: "Banner updated",
        description: "Your profile banner has been updated successfully",
      });
      
      return filePath;
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message,
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadAvatar, uploadBanner, uploading };
};
