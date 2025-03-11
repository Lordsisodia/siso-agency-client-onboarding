
import { BookOpen } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { ProfileCard } from './ProfileCard';
import { ProfileSection } from './ProfileSection';
import { motion } from "framer-motion";

interface InterestsBioProps {
  bio?: string | null;
  interests?: string[] | null;
  isEditing: boolean;
  formData: {
    bio: string;
    interests: string;
  };
  onFormChange: (field: string, value: string) => void;
}

export const InterestsBio = ({
  bio,
  interests,
  isEditing,
  formData,
  onFormChange,
}: InterestsBioProps) => {
  return (
    <ProfileCard icon={BookOpen} title="About Your Organization" isEditing={isEditing}>
      <div className="space-y-4">
        <ProfileSection label="Organization Bio">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Textarea
                value={formData.bio}
                onChange={(e) => onFormChange('bio', e.target.value)}
                className="bg-siso-bg-alt border-siso-border focus:border-siso-orange/50 focus:ring-siso-orange/20 min-h-[100px]"
                placeholder="Tell us about your organization..."
              />
            </motion.div>
          ) : (
            <motion.p 
              className="text-siso-text whitespace-pre-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {bio || 'Not set'}
            </motion.p>
          )}
        </ProfileSection>

        <ProfileSection label="Industry Interests">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Textarea
                value={formData.interests}
                onChange={(e) => onFormChange('interests', e.target.value)}
                className="bg-siso-bg-alt border-siso-border focus:border-siso-orange/50 focus:ring-siso-orange/20"
                placeholder="Enter interests separated by commas (e.g. Marketing, Sales, Technology)"
              />
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
                <p className="text-siso-text/70">No interests set</p>
              )}
            </motion.div>
          )}
        </ProfileSection>
      </div>
    </ProfileCard>
  );
};
