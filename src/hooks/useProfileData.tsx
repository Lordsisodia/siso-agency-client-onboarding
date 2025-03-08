
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useProfileImage } from './useProfileImage';

// [Analysis] Separated profile data concerns from auth logic
export interface ProfileFormData {
  fullName: string;
  businessName: string;
  businessType: string;
  industry: string;
  interests: string;
  bio: string;
  linkedinUrl: string;
  websiteUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  professionalRole: string;
}

export const useProfileData = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { uploadAvatar, uploadBanner, uploading } = useProfileImage();

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    businessName: '',
    businessType: '',
    industry: '',
    interests: '',
    bio: '',
    linkedinUrl: '',
    websiteUrl: '',
    youtubeUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    professionalRole: '',
  });

  useEffect(() => {
    let isSubscribed = true;

    const getProfile = async () => {
      try {
        // [Analysis] Only fetch profile if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('[Profile] Session error:', sessionError);
          return;
        }
        
        if (session?.user && isSubscribed) {
          console.log('[Profile] Session found:', session.user.id);
          setUser(session.user);

          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('[Profile] Profile fetch error:', profileError);
            return;
          }

          if (profileData && isSubscribed) {
            console.log('[Profile] Profile data found:', profileData);
            setProfile(profileData);
            setFormData({
              fullName: profileData.full_name || '',
              businessName: profileData.business_name || '',
              businessType: profileData.business_type || '',
              industry: profileData.industry || '',
              interests: Array.isArray(profileData.interests) ? profileData.interests.join(', ') : '',
              bio: profileData.bio || '',
              linkedinUrl: profileData.linkedin_url || '',
              websiteUrl: profileData.website_url || '',
              youtubeUrl: profileData.youtube_url || '',
              instagramUrl: profileData.instagram_url || '',
              twitterUrl: profileData.twitter_url || '',
              professionalRole: profileData.professional_role || '',
            });
          }
        }
      } catch (error: any) {
        console.error('[Profile] Error in getProfile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data",
        });
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    getProfile();

    // Set up real-time subscription to profile changes
    const subscription = supabase
      .channel('profile-changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: user?.id ? `id=eq.${user.id}` : undefined,
      }, (payload) => {
        if (isSubscribed && payload.new) {
          setProfile(payload.new);
          setFormData({
            fullName: payload.new.full_name || '',
            businessName: payload.new.business_name || '',
            businessType: payload.new.business_type || '',
            industry: payload.new.industry || '',
            interests: Array.isArray(payload.new.interests) ? payload.new.interests.join(', ') : '',
            bio: payload.new.bio || '',
            linkedinUrl: payload.new.linkedin_url || '',
            websiteUrl: payload.new.website_url || '',
            youtubeUrl: payload.new.youtube_url || '',
            instagramUrl: payload.new.instagram_url || '',
            twitterUrl: payload.new.twitter_url || '',
            professionalRole: payload.new.professional_role || '',
          });
        }
      })
      .subscribe();

    return () => {
      isSubscribed = false;
      supabase.removeChannel(subscription);
    };
  }, [toast]);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = async () => {
    if (!user?.id) return;
    
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
        .eq('id', user.id);

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

  const handleAvatarUpload = async (file: File) => {
    if (!user?.id) return;
    return await uploadAvatar(file, user.id);
  };

  const handleBannerUpload = async (file: File) => {
    if (!user?.id) return;
    return await uploadBanner(file, user.id);
  };

  return {
    user,
    profile,
    loading,
    isEditing,
    isSaving,
    uploading,
    formData,
    handleFormChange,
    setIsEditing,
    saveProfile,
    handleAvatarUpload,
    handleBannerUpload
  };
};
