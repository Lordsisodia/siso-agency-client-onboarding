
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useProfileImage = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadAvatar = async (file: File, userId: string) => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error('No file selected');
      }

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to the avatars bucket
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
        title: 'Success',
        description: 'Avatar uploaded successfully',
      });

      return filePath;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error uploading avatar',
        description: error.message,
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadBanner = async (file: File, userId: string) => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error('No file selected');
      }

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `banner-${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to the avatars bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: filePath })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: 'Success',
        description: 'Banner uploaded successfully',
      });

      return filePath;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error uploading banner',
        description: error.message,
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadAvatar,
    uploadBanner,
    uploading
  };
};
