
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { motion } from 'framer-motion';
import { useProfileData } from '@/hooks/useProfileData';
import { BasicInfo } from '@/components/profile/BasicInfo';
import { BusinessInfo } from '@/components/profile/BusinessInfo';
import { InterestsBio } from '@/components/profile/InterestsBio';
import { SocialMediaLinks } from '@/components/profile/SocialMediaLinks';
import { Button } from '@/components/ui/button';
import { Save, Edit, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { awardNavigationPoints } from '@/utils/navigationPoints';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';

export default function Organization() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuthSession();
  const {
    profile,
    loading: profileLoading,
    isEditing,
    isSaving,
    formData,
    handleFormChange,
    setIsEditing,
    saveProfile,
  } = useProfileData();

  // Award points for visiting organization page
  useEffect(() => {
    awardNavigationPoints(location.pathname);
  }, [location.pathname]);

  // Show success toast after page loads
  useEffect(() => {
    if (!profileLoading && !authLoading && profile) {
      toast.success("Organization settings loaded", {
        description: "Your organization profile is ready to view or edit",
        position: "bottom-right",
        duration: 3000,
      });
    }
  }, [profileLoading, authLoading, profile]);

  const toggleEditing = () => {
    if (isEditing) {
      saveProfile();
    } else {
      setIsEditing(true);
    }
  };

  // Show loading state while data is being fetched
  if (authLoading || profileLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-siso-orange border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-siso-text-muted">Loading organization profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-siso-text">Organization Settings</h1>
            <Button 
              onClick={toggleEditing}
              disabled={isSaving}
              className="bg-siso-orange hover:bg-siso-red text-white"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </>
              )}
            </Button>
          </div>

          <div className="space-y-6">
            <BasicInfo
              email={user?.email || null}
              fullName={profile?.full_name || null}
              professionalRole={profile?.professional_role || null}
              isEditing={isEditing}
              formData={formData}
              onFormChange={handleFormChange}
            />
            
            <BusinessInfo
              businessName={profile?.business_name || null}
              businessType={profile?.business_type || null}
              industry={profile?.industry || null}
              isEditing={isEditing}
              formData={formData}
              onFormChange={handleFormChange}
            />
            
            <InterestsBio
              bio={profile?.bio || null}
              interests={profile?.interests || null}
              isEditing={isEditing}
              formData={formData}
              onFormChange={handleFormChange}
            />
            
            <SocialMediaLinks
              linkedinUrl={profile?.linkedin_url || null}
              websiteUrl={profile?.website_url || null}
              youtubeUrl={profile?.youtube_url || null}
              instagramUrl={profile?.instagram_url || null}
              twitterUrl={profile?.twitter_url || null}
              isEditing={isEditing}
              formData={formData}
              onFormChange={handleFormChange}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
