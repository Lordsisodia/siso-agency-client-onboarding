import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { PointsHistory } from '@/components/profile/PointsHistory';
import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';
import { ProfileMetrics } from '@/components/profile/ProfileMetrics';
import { AchievementsSection } from '@/components/profile/AchievementsSection';
import { useProfileData } from '@/hooks/useProfileData';
import { useEffect } from 'react';
import { awardNavigationPoints } from '@/utils/navigationPoints';
import { useLocation } from 'react-router-dom';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const {
    user,
    profile,
    loading,
    isEditing,
    isSaving,
    formData,
    handleFormChange,
    setIsEditing,
    saveProfile,
    handleAvatarUpload,
    handleBannerUpload
  } = useProfileData();

  // Award points for visiting profile page
  useEffect(() => {
    awardNavigationPoints(location.pathname);
  }, [location.pathname]);

  // Show success toast after page loads
  useEffect(() => {
    if (!loading && user && profile) {
      toast({
        title: "Profile loaded",
        description: "Your profile is ready to view or edit",
      });
    }
  }, [loading, user, profile, toast]);

  // Sample data for achievements (would normally come from the database)
  const sampleAchievements = [
    {
      id: '1',
      title: 'First Project Created',
      description: 'Created your first project on the platform',
      date: 'Jan 15, 2023'
    },
    {
      id: '2',
      title: '7-Day Login Streak',
      description: 'Logged in for 7 consecutive days',
      date: 'Feb 2, 2023'
    },
    {
      id: '3',
      title: 'Resource Contributor',
      description: 'Shared 5 resources with the community',
      date: 'Mar 10, 2023'
    }
  ];

  // Sample data for recent activities (would normally come from the database)
  const sampleActivities = [
    {
      action: 'Daily Login',
      points: 5,
      date: '2 hours ago'
    },
    {
      action: 'Watched Tutorial Video',
      points: 10,
      date: 'Yesterday'
    },
    {
      action: 'Project Milestone Completed',
      points: 25,
      date: '3 days ago'
    }
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  const toggleEditing = () => {
    if (isEditing) {
      // If we're currently editing, save changes
      saveProfile();
    } else {
      // Otherwise, enter edit mode
      setIsEditing(true);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <ProfileLayout>
        <div className="text-center p-8">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <UserCircle className="h-6 w-6" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>
              Please sign in to view your profile.
            </AlertDescription>
          </Alert>
          <Button 
            className="mt-4 bg-siso-orange hover:bg-siso-red text-white"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
        </div>
      </ProfileLayout>
    );
  }

  // Even if profile is null/undefined, we should still show a profile setup screen, not a "not found" error
  const isProfileEmpty = !profile || 
    (!profile.full_name && 
     !profile.business_name && 
     !profile.bio && 
     !profile.industry);

  if (isProfileEmpty && !isEditing) {
    return (
      <ProfileLayout>
        <div className="text-center p-8">
          <Alert className="max-w-md mx-auto bg-siso-orange/10 border-siso-orange text-siso-text">
            <UserCircle className="h-6 w-6 text-siso-orange" />
            <AlertTitle>Welcome!</AlertTitle>
            <AlertDescription className="text-siso-text">
              Your profile is ready to be set up. Click the button below to get started.
            </AlertDescription>
          </Alert>
          <Button 
            className="mt-4 bg-siso-orange hover:bg-siso-red text-white"
            onClick={() => setIsEditing(true)}
          >
            Set Up Profile
          </Button>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-siso-text/10">
        <ProfileHeader
          fullName={profile?.full_name}
          email={user?.email}
          points={profile?.points || 0}
          rank={profile?.rank || 'Bronze'}
          avatarUrl={profile?.avatar_url}
          bannerUrl={profile?.banner_url}
          onLogout={handleLogout}
          onBackToHome={handleBackToHome}
          onUploadAvatar={handleAvatarUpload}
          onUploadBanner={handleBannerUpload}
          isEditing={isEditing}
          onEditToggle={toggleEditing}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <ProfileMetrics 
          userId={user.id}
        />

        <div className="md:col-span-2">
          <ProfileInfo
            email={user?.email}
            fullName={profile?.full_name}
            points={profile?.points || 0}
            rank={profile?.rank || 'Bronze'}
            businessName={profile?.business_name}
            businessType={profile?.business_type}
            industry={profile?.industry}
            interests={profile?.interests}
            bio={profile?.bio}
            linkedinUrl={profile?.linkedin_url}
            websiteUrl={profile?.website_url}
            youtubeUrl={profile?.youtube_url}
            instagramUrl={profile?.instagram_url}
            twitterUrl={profile?.twitter_url}
            professionalRole={profile?.professional_role}
            isEditing={isEditing}
            isSaving={isSaving}
            formData={formData}
            onFormChange={handleFormChange}
            onSave={saveProfile}
          />
        </div>
        
        <div className="md:col-span-2">
          <AchievementsSection 
            achievements={profile?.achievements || sampleAchievements}
            pointsTotal={profile?.points || 0}
            pointsNextLevel={1000}
            rank={profile?.rank || 'Bronze'}
            recentActivities={sampleActivities}
          />
        </div>
        
        <div className="md:col-span-1">
          {user && <PointsHistory userId={user.id} />}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
