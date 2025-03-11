
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProfileFormData } from '@/types/profile';

export interface UseProfileFormProps {
  userId: string | undefined;
  initialFormData: ProfileFormData;
}

export const useProfileForm = ({ userId, initialFormData }: UseProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = async () => {
    if (!userId) return;
    
    setIsSaving(true);
    
    try {
      // Process interests from comma-separated string to array
      const interestsArray = formData.interests
        ? formData.interests.split(',').map(item => item.trim())
        : [];
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          business_name: formData.businessName,
          business_type: formData.businessType,
          industry: formData.industry,
          interests: interestsArray,
          bio: formData.bio,
          linkedin_url: formData.linkedinUrl,
          website_url: formData.websiteUrl,
          youtube_url: formData.youtubeUrl,
          instagram_url: formData.instagramUrl,
          twitter_url: formData.twitterUrl,
          professional_role: formData.professionalRole,
        })
        .eq('id', userId);

      if (error) throw error;
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile: " + error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    formData,
    isEditing,
    isSaving,
    handleFormChange,
    setIsEditing,
    saveProfile
  };
};
