
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Briefcase, Building, Users, BookOpen, User, Save, Loader2 } from "lucide-react";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { BasicInfo } from "./BasicInfo";
import { BusinessInfo } from "./BusinessInfo";
import { InterestsBio } from "./InterestsBio";
import { ProfileCard } from "./ProfileCard";
import { ProfileFormData } from "@/hooks/useProfileData";

interface ProfileInfoProps {
  email?: string | null;
  fullName?: string | null;
  points: number;
  rank: string;
  businessName?: string | null;
  businessType?: string | null;
  industry?: string | null;
  interests?: string[] | null;
  bio?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  youtubeUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  professionalRole?: string | null;
  isEditing: boolean;
  isSaving?: boolean;
  formData: ProfileFormData;
  onFormChange: (field: string, value: string) => void;
  onSave?: () => Promise<void>;
}

export const ProfileInfo = ({ 
  email,
  fullName,
  points,
  rank,
  businessName,
  businessType,
  industry,
  interests,
  bio,
  linkedinUrl,
  websiteUrl,
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  professionalRole,
  isEditing,
  isSaving = false,
  formData,
  onFormChange,
  onSave
}: ProfileInfoProps) => {
  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSave) {
      await onSave();
    }
  };

  return (
    <div className="space-y-6">
      <ProfileCard icon={User} title="Basic Information" isEditing={isEditing}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Full Name</label>
            {isEditing ? (
              <Input
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => onFormChange('fullName', e.target.value)}
                className="w-full"
              />
            ) : (
              <p className="text-siso-text-bold">{fullName || 'Not provided'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Email</label>
            <p className="text-siso-text-bold">{email || 'Not provided'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Professional Role</label>
            {isEditing ? (
              <Input
                placeholder="Your professional role"
                value={formData.professionalRole}
                onChange={(e) => onFormChange('professionalRole', e.target.value)}
                className="w-full"
              />
            ) : (
              <p className="text-siso-text-bold">{professionalRole || 'Not provided'}</p>
            )}
          </div>
        </div>
      </ProfileCard>
      
      <ProfileCard icon={Building} title="Business Information" isEditing={isEditing}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Business Name</label>
            {isEditing ? (
              <Input
                placeholder="Your business name"
                value={formData.businessName}
                onChange={(e) => onFormChange('businessName', e.target.value)}
                className="w-full"
              />
            ) : (
              <p className="text-siso-text-bold">{businessName || 'Not provided'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Business Type</label>
            {isEditing ? (
              <Input
                placeholder="Your business type"
                value={formData.businessType}
                onChange={(e) => onFormChange('businessType', e.target.value)}
                className="w-full"
              />
            ) : (
              <p className="text-siso-text-bold">{businessType || 'Not provided'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Industry</label>
            {isEditing ? (
              <Input
                placeholder="Your industry"
                value={formData.industry}
                onChange={(e) => onFormChange('industry', e.target.value)}
                className="w-full"
              />
            ) : (
              <p className="text-siso-text-bold">{industry || 'Not provided'}</p>
            )}
          </div>
        </div>
      </ProfileCard>
      
      <ProfileCard icon={BookOpen} title="About You" isEditing={isEditing}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Bio</label>
            {isEditing ? (
              <Textarea
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={(e) => onFormChange('bio', e.target.value)}
                className="w-full min-h-[100px]"
              />
            ) : (
              <p className="text-siso-text-bold whitespace-pre-wrap">{bio || 'Not provided'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Interests</label>
            {isEditing ? (
              <Textarea
                placeholder="Your interests (comma separated)"
                value={formData.interests}
                onChange={(e) => onFormChange('interests', e.target.value)}
                className="w-full"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {interests && interests.length > 0 ? (
                  interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-siso-orange/10 text-siso-orange rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-siso-text/70">No interests provided</p>
                )}
              </div>
            )}
          </div>
        </div>
      </ProfileCard>
      
      <ProfileCard icon={Globe} title="Social Media" isEditing={isEditing}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">LinkedIn</label>
            {isEditing ? (
              <Input
                placeholder="Your LinkedIn URL"
                value={formData.linkedinUrl}
                onChange={(e) => onFormChange('linkedinUrl', e.target.value)}
                className="w-full"
              />
            ) : (
              linkedinUrl ? (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-siso-orange hover:underline">
                  {linkedinUrl}
                </a>
              ) : (
                <p className="text-siso-text/70">Not provided</p>
              )
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Website</label>
            {isEditing ? (
              <Input
                placeholder="Your website URL"
                value={formData.websiteUrl}
                onChange={(e) => onFormChange('websiteUrl', e.target.value)}
                className="w-full"
              />
            ) : (
              websiteUrl ? (
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-siso-orange hover:underline">
                  {websiteUrl}
                </a>
              ) : (
                <p className="text-siso-text/70">Not provided</p>
              )
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">YouTube</label>
            {isEditing ? (
              <Input
                placeholder="Your YouTube URL"
                value={formData.youtubeUrl}
                onChange={(e) => onFormChange('youtubeUrl', e.target.value)}
                className="w-full"
              />
            ) : (
              youtubeUrl ? (
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-siso-orange hover:underline">
                  {youtubeUrl}
                </a>
              ) : (
                <p className="text-siso-text/70">Not provided</p>
              )
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Instagram</label>
            {isEditing ? (
              <Input
                placeholder="Your Instagram URL"
                value={formData.instagramUrl}
                onChange={(e) => onFormChange('instagramUrl', e.target.value)}
                className="w-full"
              />
            ) : (
              instagramUrl ? (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-siso-orange hover:underline">
                  {instagramUrl}
                </a>
              ) : (
                <p className="text-siso-text/70">Not provided</p>
              )
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-siso-text mb-1">Twitter</label>
            {isEditing ? (
              <Input
                placeholder="Your Twitter URL"
                value={formData.twitterUrl}
                onChange={(e) => onFormChange('twitterUrl', e.target.value)}
                className="w-full"
              />
            ) : (
              twitterUrl ? (
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-siso-orange hover:underline">
                  {twitterUrl}
                </a>
              ) : (
                <p className="text-siso-text/70">Not provided</p>
              )
            )}
          </div>
        </div>
      </ProfileCard>
      
      {isEditing && onSave && (
        <div className="flex justify-end">
          <Button 
            onClick={handleSaveClick}
            disabled={isSaving}
            className="bg-siso-orange hover:bg-siso-red text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
