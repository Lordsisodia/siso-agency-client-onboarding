
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProfileData, ProfileFormData } from '@/types/profile';
import { safeJsonArray } from '@/utils/json-helpers';
import { Achievement } from '@/types/profile';

export const useProfileFetch = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
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
        // Only fetch profile if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('[Profile] Session error:', sessionError);
          setLoading(false);
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
            
            // Check if the error is "no rows returned" which means profile doesn't exist
            if (profileError.code === 'PGRST116') {
              // Create a default profile for the user
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert([{ id: session.user.id }])
                .select()
                .single();
                
              if (createError) {
                console.error('[Profile] Failed to create profile:', createError);
                setLoading(false);
                return;
              }
              
              if (newProfile && isSubscribed) {
                console.log('[Profile] Created new profile:', newProfile);
                
                // Convert JSON achievements to proper Achievement[] type
                const achievements = safeJsonArray<Achievement>(newProfile.achievements);
                
                // Create a properly typed ProfileData with achievements array
                const typedProfileData: ProfileData = {
                  ...newProfile,
                  achievements
                };
                
                setProfile(typedProfileData);
              }
            }
            
            setLoading(false);
            return;
          }

          if (profileData && isSubscribed) {
            console.log('[Profile] Profile data found:', profileData);
            
            // Convert JSON achievements to proper Achievement[] type
            const achievements = safeJsonArray<Achievement>(profileData.achievements);
            
            // Create a properly typed ProfileData with achievements array
            const typedProfileData: ProfileData = {
              ...profileData,
              achievements
            };
            
            setProfile(typedProfileData);
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
          // Convert JSON achievements to proper Achievement[] type
          const achievements = safeJsonArray<Achievement>(payload.new.achievements);
          
          // Create a properly typed ProfileData with achievements array
          const typedProfileData: ProfileData = {
            ...(payload.new as any),
            achievements
          };
          
          setProfile(typedProfileData);
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

  return {
    user,
    profile,
    loading,
    formData
  };
};
