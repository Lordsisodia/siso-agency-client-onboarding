
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSection } from '@/components/profile/ProfileSection';
import { ProfileMetrics } from '@/components/profile/ProfileMetrics';
import { AchievementsSection } from '@/components/profile/AchievementsSection';
import { BusinessInfo } from '@/components/profile/BusinessInfo';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { BasicInfo } from '@/components/profile/BasicInfo';
import { InterestsBio } from '@/components/profile/InterestsBio';
import { SocialMediaLinks } from '@/components/profile/SocialMediaLinks';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Star, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock data for demonstration
const mockAchievements = [
  { id: 1, name: 'First Project', description: 'Created your first project', icon: <Trophy className="h-5 w-5 text-yellow-500" />, date: '2023-05-10', pointsAwarded: 50 },
  { id: 2, name: 'Team Player', description: 'Added 5 team members', icon: <Medal className="h-5 w-5 text-blue-500" />, date: '2023-06-22', pointsAwarded: 75 },
  { id: 3, name: 'Planning Expert', description: 'Completed 10 project plans', icon: <Star className="h-5 w-5 text-purple-500" />, date: '2023-07-15', pointsAwarded: 100 },
  { id: 4, name: 'Milestone Master', description: 'Reached 50 milestones', icon: <Award className="h-5 w-5 text-green-500" />, date: '2023-08-30', pointsAwarded: 150 },
];

const Organization = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ProfileHeader 
          fullName="Alex Johnson"
          businessName="Acme Technologies"
          avatarUrl="/lovable-uploads/c482563a-42db-4f47-83f2-c2e7771400b7.png"
          bannerUrl="/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png"
          points={1250}
          rank="Planning Expert"
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onAvatarUpload={async (file) => Promise.resolve('/lovable-uploads/c482563a-42db-4f47-83f2-c2e7771400b7.png')}
          onBannerUpload={async (file) => Promise.resolve('/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png')}
          isUploadingAvatar={false}
          isUploadingBanner={false}
        />
        
        <div className="mt-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <ProfileSection title="Basic Information">
                    <BasicInfo 
                      name="Alex Johnson"
                      email="alex@acmetech.com"
                      phone="+1 (555) 123-4567"
                      location="San Francisco, CA"
                      isEditing={isEditing}
                    />
                  </ProfileSection>
                  
                  <ProfileSection title="Bio & Interests">
                    <InterestsBio 
                      bio="Product manager with 8+ years of experience in SaaS. Passionate about building user-centric solutions that solve real problems."
                      interests={["Product Management", "UX Design", "Agile", "SaaS"]}
                      isEditing={isEditing}
                    />
                  </ProfileSection>
                </div>
                
                <div className="space-y-6">
                  <ProfileCard>
                    <ProfileMetrics 
                      projects={12}
                      tasks={48}
                      points={1250}
                      rank="Planning Expert"
                    />
                  </ProfileCard>
                  
                  <ProfileSection title="Social Links">
                    <SocialMediaLinks 
                      linkedIn="https://linkedin.com/in/alexjohnson"
                      twitter="https://twitter.com/alexj"
                      github="https://github.com/alexj"
                      website="https://acmetech.com"
                      isEditing={isEditing}
                    />
                  </ProfileSection>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="business" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <BusinessInfo 
                    companyName="Acme Technologies"
                    industry="Software & Technology"
                    website="https://acmetech.com"
                    employeeCount="50-200"
                    foundingYear="2015"
                    isEditing={isEditing}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <AchievementsSection 
                    achievements={mockAchievements}
                    pointsTotal={1250}
                    pointsNextLevel={1500}
                    rank="Planning Expert"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

export default Organization;
