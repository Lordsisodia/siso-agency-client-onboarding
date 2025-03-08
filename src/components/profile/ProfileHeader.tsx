
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, ArrowLeft, Camera, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface ProfileHeaderProps {
  fullName?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  points: number;
  rank: string;
  onLogout: () => Promise<void>;
  onBackToHome: () => void;
  onUploadAvatar?: (file: File) => Promise<string | null>;
  onUploadBanner?: (file: File) => Promise<string | null>;
  isEditing?: boolean;
  onEditToggle?: () => void;
}

export const ProfileHeader = ({
  fullName,
  email,
  avatarUrl,
  bannerUrl,
  points,
  rank,
  onLogout,
  onBackToHome,
  onUploadAvatar,
  onUploadBanner,
  isEditing,
  onEditToggle
}: ProfileHeaderProps) => {
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    try {
      setAvatarLoading(true);
      if (onUploadAvatar) {
        await onUploadAvatar(files[0]);
      }
    } finally {
      setAvatarLoading(false);
      e.target.value = '';
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    try {
      setBannerLoading(true);
      if (onUploadBanner) {
        await onUploadBanner(files[0]);
      }
    } finally {
      setBannerLoading(false);
      e.target.value = '';
    }
  };

  const getBannerUrl = () => {
    if (!bannerUrl) return '/lovable-uploads/8fa1a06e-e80e-4869-8ef8-683326c20870.png';
    return supabase.storage.from('avatars').getPublicUrl(bannerUrl).data.publicUrl;
  };

  const getAvatarUrl = () => {
    if (!avatarUrl) return null;
    return supabase.storage.from('avatars').getPublicUrl(avatarUrl).data.publicUrl;
  };

  return (
    <div className="relative mb-8">
      {/* Banner */}
      <div className="relative h-40 md:h-56 rounded-xl overflow-hidden">
        <img
          src={getBannerUrl()}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        
        {onUploadBanner && (
          <label 
            className="absolute right-4 top-4 p-2 bg-black/60 rounded-full cursor-pointer hover:bg-black/80 transition-colors"
            htmlFor="banner-upload"
          >
            <Camera size={18} className="text-white" />
            <input 
              id="banner-upload" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleBannerChange}
              disabled={bannerLoading}
            />
          </label>
        )}
      </div>
      
      {/* Avatar */}
      <div className="absolute bottom-0 left-6 transform translate-y-1/3">
        <div className="relative">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-black overflow-hidden bg-siso-text/10">
            {getAvatarUrl() ? (
              <img
                src={getAvatarUrl()}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-siso-orange/30 to-siso-red/30">
                <span className="text-3xl font-bold text-white">
                  {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            )}
          </div>
          
          {onUploadAvatar && (
            <label 
              className="absolute right-1 bottom-1 p-2 bg-black/60 rounded-full cursor-pointer hover:bg-black/80 transition-colors"
              htmlFor="avatar-upload"
            >
              <Camera size={16} className="text-white" />
              <input 
                id="avatar-upload" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleAvatarChange}
                disabled={avatarLoading}
              />
            </label>
          )}
        </div>
      </div>
      
      {/* Profile Info Card */}
      <Card className="mt-12 p-4 pt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-siso-text-bold">{fullName || 'User'}</h2>
          <p className="text-sm text-siso-text/70">{email}</p>
          <div className="mt-2 flex items-center">
            <span className="text-siso-text font-medium mr-1">Points:</span>
            <span className="text-siso-orange font-bold">{points}</span>
            <span className="mx-2 text-siso-text/30">|</span>
            <span className="text-siso-text font-medium mr-1">Rank:</span>
            <span className="text-siso-orange font-bold">{rank}</span>
          </div>
        </div>
        
        <div className="flex mt-4 sm:mt-0 gap-2">
          {onEditToggle && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onEditToggle}
              className={`flex items-center gap-1 ${isEditing ? 'text-green-500' : 'text-siso-orange'}`}
            >
              <Edit size={16} />
              {isEditing ? 'Editing' : 'Edit Profile'}
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBackToHome}
            className="flex items-center gap-1 text-siso-text/80"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout}
            className="flex items-center gap-1 text-siso-red"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
