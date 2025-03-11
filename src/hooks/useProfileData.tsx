
import { useProfileFetch } from './profile/useProfileFetch';
import { useProfileForm } from './profile/useProfileForm';
import { useProfileImage } from './useProfileImage';

export type { ProfileFormData, ProfileData, Achievement } from '@/types/profile';

export const useProfileData = () => {
  const { user, profile, loading, formData: initialFormData } = useProfileFetch();
  const { formData, isEditing, isSaving, handleFormChange, setIsEditing, saveProfile } = 
    useProfileForm({ 
      userId: user?.id,
      initialFormData
    });
  const { uploadAvatar, uploadBanner, uploading } = useProfileImage();

  const handleAvatarUpload = async (file: File) => {
    if (!user?.id) return;
    return await uploadAvatar(file, user.id);
  };

  const handleBannerUpload = async (file: File) => {
    if (!user?.id) return;
    return await uploadBanner(file, user.id);
  };

  return {
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
  };
};
