
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut, Camera, Edit, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProfileHeaderProps {
  fullName: string | null;
  email: string | null;
  points: number;
  rank: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  onLogout: () => void;
  onBackToHome: () => void;
  onUploadAvatar: (file: File) => Promise<string | null>;
  onUploadBanner: (file: File) => Promise<string | null>;
  isEditing: boolean;
  onEditToggle: () => void;
}

export const ProfileHeader = ({
  fullName,
  email,
  points,
  rank,
  avatarUrl,
  bannerUrl,
  onLogout,
  onBackToHome,
  onUploadAvatar,
  onUploadBanner,
  isEditing,
  onEditToggle
}: ProfileHeaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    try {
      const file = e.target.files[0];
      await onUploadAvatar(file);
    } catch (error) {
      console.error('Avatar upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    try {
      const file = e.target.files[0];
      await onUploadBanner(file);
    } catch (error) {
      console.error('Banner upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getPublicUrl = (path: string | null) => {
    if (!path) return null;
    return supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;
  };

  const bannerStyle = bannerUrl 
    ? { backgroundImage: `url(${getPublicUrl(bannerUrl)})` }
    : { 
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url(/images/default-banner.jpg)',
        backgroundColor: '#13151A'
      };

  return (
    <div className="flex flex-col w-full">
      {/* Banner */}
      <div 
        className="relative w-full h-40 bg-cover bg-center rounded-t-lg bg-siso-bg/10"
        style={bannerStyle}
      >
        {isEditing && (
          <label 
            htmlFor="banner-upload" 
            className="absolute right-4 bottom-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full cursor-pointer transition-colors"
          >
            <Camera className="w-5 h-5" />
            <input 
              id="banner-upload" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleBannerUpload}
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      {/* Profile Info + Actions */}
      <div className="flex flex-wrap justify-between px-6 pb-4 pt-16 sm:pt-4 relative">
        {/* Avatar (placed over the banner) */}
        <div className="absolute -top-12 left-6 sm:relative sm:top-auto sm:left-auto">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-siso-bg/95 shadow-xl">
              <AvatarImage src={avatarUrl ? getPublicUrl(avatarUrl) : undefined} />
              <AvatarFallback className="bg-siso-orange/20 text-siso-orange text-xl">
                {fullName?.charAt(0) || email?.charAt(0) || '?'}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full cursor-pointer transition-colors"
              >
                <Camera className="w-4 h-4" />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0 ml-0 sm:ml-4 mt-2 sm:mt-0">
          <h1 className="text-xl font-bold text-siso-text truncate">{fullName || 'User'}</h1>
          <p className="text-sm text-siso-text/70">{email}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-siso-orange/20 text-siso-orange">
              {rank} · {points} Points
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-siso-bg-alt border border-siso-border hover:border-siso-border-hover text-siso-text transition-colors"
            onClick={onBackToHome}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-siso-bg-alt border border-siso-border hover:border-siso-border-hover text-siso-text transition-colors"
            onClick={onEditToggle}
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4" />
                Save
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                Edit
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-siso-red/10 border border-siso-red/20 hover:bg-siso-red/20 text-siso-red transition-colors"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </motion.button>
        </div>
      </div>
    </div>
  );
};
