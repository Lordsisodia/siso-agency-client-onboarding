
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { BasicInfo } from "./BasicInfo";
import { BusinessInfo } from "./BusinessInfo";
import { InterestsBio } from "./InterestsBio";
import { ProfileFormData } from "@/types/profile";

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
      <BasicInfo 
        email={email}
        fullName={fullName}
        professionalRole={professionalRole}
        isEditing={isEditing}
        formData={formData}
        onFormChange={onFormChange}
      />
      
      <BusinessInfo 
        businessName={businessName}
        businessType={businessType}
        industry={industry}
        isEditing={isEditing}
        formData={formData}
        onFormChange={onFormChange}
      />
      
      <InterestsBio 
        bio={bio}
        interests={interests}
        isEditing={isEditing}
        formData={formData}
        onFormChange={onFormChange}
      />
      
      <SocialMediaLinks 
        linkedinUrl={linkedinUrl}
        websiteUrl={websiteUrl}
        youtubeUrl={youtubeUrl}
        instagramUrl={instagramUrl}
        twitterUrl={twitterUrl}
        isEditing={isEditing}
        formData={formData}
        onFormChange={onFormChange}
      />
      
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
