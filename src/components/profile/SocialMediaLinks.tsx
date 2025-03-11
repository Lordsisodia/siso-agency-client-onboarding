
import { Globe } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ProfileCard } from './ProfileCard';
import { ProfileSection } from './ProfileSection';
import { motion } from "framer-motion";

interface SocialMediaLinksProps {
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  youtubeUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  isEditing: boolean;
  formData: {
    linkedinUrl: string;
    websiteUrl: string;
    youtubeUrl: string;
    instagramUrl: string;
    twitterUrl: string;
  };
  onFormChange: (field: string, value: string) => void;
}

export const SocialMediaLinks = ({
  linkedinUrl,
  websiteUrl,
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  isEditing,
  formData,
  onFormChange,
}: SocialMediaLinksProps) => {
  return (
    <ProfileCard icon={Globe} title="Online Presence" isEditing={isEditing}>
      <div className="space-y-4">
        <ProfileSection label="Company Website">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={formData.websiteUrl}
                onChange={(e) => onFormChange('websiteUrl', e.target.value)}
                className="bg-siso-bg-alt border-siso-border focus:border-siso-orange/50 focus:ring-siso-orange/20"
                placeholder="https://your-website.com"
              />
            </motion.div>
          ) : (
            websiteUrl ? (
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-siso-orange hover:underline"
              >
                {websiteUrl}
              </a>
            ) : (
              <p className="text-siso-text/70">Not set</p>
            )
          )}
        </ProfileSection>

        <ProfileSection label="LinkedIn">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={formData.linkedinUrl}
                onChange={(e) => onFormChange('linkedinUrl', e.target.value)}
                className="bg-siso-bg-alt border-siso-border focus:border-siso-orange/50 focus:ring-siso-orange/20"
                placeholder="https://linkedin.com/company/your-company"
              />
            </motion.div>
          ) : (
            linkedinUrl ? (
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-siso-orange hover:underline"
              >
                {linkedinUrl}
              </a>
            ) : (
              <p className="text-siso-text/70">Not set</p>
            )
          )}
        </ProfileSection>

        <ProfileSection label="YouTube">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={formData.youtubeUrl}
                onChange={(e) => onFormChange('youtubeUrl', e.target.value)}
                className="bg-siso-bg-alt border-siso-border focus:border-siso-orange/50 focus:ring-siso-orange/20"
                placeholder="https://youtube.com/@your-channel"
              />
            </motion.div>
          ) : (
            youtubeUrl ? (
              <a 
                href={youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-siso-orange hover:underline"
              >
                {youtubeUrl}
              </a>
            ) : (
              <p className="text-siso-text/70">Not set</p>
            )
          )}
        </ProfileSection>

        <ProfileSection label="Instagram">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={formData.instagramUrl}
                onChange={(e) => onFormChange('instagramUrl', e.target.value)}
                className="bg-siso-bg-alt border-siso-border focus:border-siso-orange/50 focus:ring-siso-orange/20"
                placeholder="https://instagram.com/your-company"
              />
            </motion.div>
          ) : (
            instagramUrl ? (
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-siso-orange hover:underline"
              >
                {instagramUrl}
              </a>
            ) : (
              <p className="text-siso-text/70">Not set</p>
            )
          )}
        </ProfileSection>

        <ProfileSection label="Twitter">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={formData.twitterUrl}
                onChange={(e) => onFormChange('twitterUrl', e.target.value)}
                className="bg-siso-bg-alt border-siso-border focus:border-siso-orange/50 focus:ring-siso-orange/20"
                placeholder="https://twitter.com/your-company"
              />
            </motion.div>
          ) : (
            twitterUrl ? (
              <a 
                href={twitterUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-siso-orange hover:underline"
              >
                {twitterUrl}
              </a>
            ) : (
              <p className="text-siso-text/70">Not set</p>
            )
          )}
        </ProfileSection>
      </div>
    </ProfileCard>
  );
};
