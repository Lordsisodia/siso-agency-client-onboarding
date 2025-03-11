
import { Helmet } from 'react-helmet';
import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileMetrics } from '@/components/profile/ProfileMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfileData } from '@/hooks/useProfileData';
import { Building2, User } from 'lucide-react';
import { AchievementsSection } from '@/components/profile/AchievementsSection';

export default function Organization() {
  const {
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
  } = useProfileData();

  return (
    <ProfileLayout>
      <Helmet>
        <title>Organization | SISO</title>
        <meta name="description" content="Manage your organization profile and settings" />
      </Helmet>
      
      <div className="space-y-8">
        {profile && (
          <ProfileHeader
            fullName={profile.full_name}
            professionalRole={profile.professional_role}
            businessName={profile.business_name}
            avatarUrl={profile.avatar_url}
            bannerUrl={profile.banner_url}
            points={profile.points}
            tokens={profile.siso_tokens}
            rank={profile.rank}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onAvatarUpload={handleAvatarUpload}
            onBannerUpload={handleBannerUpload}
            isUploading={uploading}
          />
        )}
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-siso-bg-alt mb-6">
            <TabsTrigger value="profile" className="data-[state=active]:bg-siso-orange/10 data-[state=active]:text-siso-orange">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-siso-orange/10 data-[state=active]:text-siso-orange">
              <Building2 className="w-4 h-4 mr-2" />
              Business
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            {profile && (
              <>
                <ProfileInfo
                  email={user?.email}
                  fullName={profile.full_name}
                  points={profile.points}
                  rank={profile.rank}
                  businessName={profile.business_name}
                  businessType={profile.business_type}
                  industry={profile.industry}
                  interests={profile.interests}
                  bio={profile.bio}
                  linkedinUrl={profile.linkedin_url}
                  websiteUrl={profile.website_url}
                  youtubeUrl={profile.youtube_url}
                  instagramUrl={profile.instagram_url}
                  twitterUrl={profile.twitter_url}
                  professionalRole={profile.professional_role}
                  isEditing={isEditing}
                  isSaving={isSaving}
                  formData={formData}
                  onFormChange={handleFormChange}
                  onSave={saveProfile}
                />
              </>
            )}
          </TabsContent>
          
          <TabsContent value="business" className="space-y-6">
            {profile && (
              <>
                <ProfileMetrics
                  contributionCount={profile.contribution_count}
                  referralCount={profile.referral_count}
                  tokens={profile.siso_tokens}
                  points={profile.points}
                  rank={profile.rank}
                />
                
                <AchievementsSection
                  achievements={profile.achievements || []}
                />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ProfileLayout>
  );
}
