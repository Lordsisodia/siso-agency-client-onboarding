
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { Building, Edit, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompanyProfileForm } from '@/components/company-profile/CompanyProfileForm';
import { CompanyImageUpload } from '@/components/company-profile/CompanyImageUpload';
import { CompanyProfileStats } from '@/components/company-profile/CompanyProfileStats';
import { WebsiteAnalyzer } from '@/components/company-profile/WebsiteAnalyzer';
import { AnalysisGuide } from '@/components/company-profile/AnalysisGuide';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function CompanyProfile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setIsAuthenticated(false);
          setUserId(null);
          setCompanyProfile(null);
          setIsLoading(false);
          return;
        }
        
        setIsAuthenticated(true);
        setUserId(session.user.id);
        
        // Fetch company profile
        const { data: profile, error } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {  // PGRST116 means "no rows returned"
          console.error('Error fetching profile:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load company profile"
          });
        }
        
        setCompanyProfile(profile || null);
        
        // If no profile exists yet, start in edit mode
        if (!profile && isAuthenticated) {
          setIsEditing(true);
          setShowPreview(false);
        } else {
          setShowPreview(true);
        }
      } catch (error) {
        console.error('Error in fetchUserAndProfile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserAndProfile();
  }, [toast]);

  const handleRefreshProfile = async () => {
    if (!userId) return;
    
    try {
      const { data: profile, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) throw error;
      
      setCompanyProfile(profile);
      setIsEditing(false);
      setShowPreview(true);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const handleLogoUpdate = (url: string) => {
    setCompanyProfile((prev: any) => ({ ...prev, logo_url: url }));
  };

  const handleBannerUpdate = (url: string) => {
    setCompanyProfile((prev: any) => ({ ...prev, banner_url: url }));
  };

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
    
    // If we're not in editing mode, switch to editing mode to show the form
    if (!isEditing) {
      setIsEditing(true);
      setShowPreview(false);
    }
  };

  const handleStartEditing = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setIsEditing(true);
    setShowPreview(false);
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>

        <div className="relative z-10 container px-4 py-8 sm:py-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
                Company Profile
              </h1>
              <p className="mt-4 text-lg text-siso-text/80">
                {isAuthenticated 
                  ? (isEditing 
                    ? "Update your company information and branding" 
                    : "Manage your company information and branding preferences")
                  : "Create an account to set up your company profile"}
              </p>
            </div>
            
            {!isLoading && isAuthenticated && (
              <Button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setShowPreview(!showPreview);
                }}
                className={`mt-4 sm:mt-0 ${isEditing 
                  ? "bg-siso-text/10 text-siso-text hover:bg-siso-text/20" 
                  : "bg-gradient-to-r from-siso-red to-siso-orange text-white hover:from-siso-red/90 hover:to-siso-orange/90"}`}
              >
                {isEditing ? (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Cancel Editing
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            )}
            
            {!isLoading && !isAuthenticated && (
              <Button
                onClick={() => navigate('/auth')}
                className="mt-4 sm:mt-0 bg-gradient-to-r from-siso-red to-siso-orange text-white hover:from-siso-red/90 hover:to-siso-orange/90"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </motion.div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-siso-orange"></div>
            </div>
          ) : (
            <>
              {(!companyProfile || (!isAuthenticated && !showPreview)) && (
                <AnalysisGuide 
                  isEditing={isEditing} 
                  hasAnalysisData={!!analysisData}
                  onStartEditing={handleStartEditing}
                  isAuthenticated={isAuthenticated}
                />
              )}
              
              {(!companyProfile || isEditing) && (
                <WebsiteAnalyzer 
                  onAnalysisComplete={handleAnalysisComplete}
                  isAuthenticated={isAuthenticated}
                />
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    <CompanyProfileStats 
                      companyName={companyProfile?.company_name}
                      yearFounded={companyProfile?.year_founded}
                      employeeCount={companyProfile?.employee_count}
                      industry={companyProfile?.industry}
                      companyType={companyProfile?.company_type}
                    />
                    
                    {isEditing && userId && isAuthenticated && (
                      <>
                        <CompanyImageUpload 
                          userId={userId}
                          type="logo"
                          currentUrl={companyProfile?.logo_url}
                          onUploadComplete={handleLogoUpdate}
                        />
                        
                        <CompanyImageUpload 
                          userId={userId}
                          type="banner"
                          currentUrl={companyProfile?.banner_url}
                          onUploadComplete={handleBannerUpdate}
                        />
                      </>
                    )}
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  {isEditing && userId && isAuthenticated ? (
                    <CompanyProfileForm 
                      initialData={companyProfile} 
                      analysisData={analysisData}
                      onSave={handleRefreshProfile}
                      userId={userId}
                    />
                  ) : (
                    showPreview && <CompanyProfilePreview 
                      profile={companyProfile} 
                      isAuthenticated={isAuthenticated}
                      onEditClick={handleStartEditing}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

interface CompanyProfilePreviewProps {
  profile: any;
  isAuthenticated: boolean;
  onEditClick: () => void;
}

const CompanyProfilePreview = ({ profile, isAuthenticated, onEditClick }: CompanyProfilePreviewProps) => {
  if (!profile) {
    return (
      <motion.div 
        className="p-8 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Building className="w-16 h-16 mx-auto mb-4 text-siso-orange/70" />
        <h3 className="text-2xl font-semibold text-siso-text-bold mb-2">No Company Profile Yet</h3>
        <p className="text-siso-text/70 mb-6">
          {isAuthenticated 
            ? "Click the 'Edit Profile' button to create your company profile and customize your brand identity."
            : "Sign in to create your company profile and customize your brand identity."}
        </p>
        <Button
          onClick={onEditClick}
          className="bg-gradient-to-r from-siso-red to-siso-orange text-white hover:from-siso-red/90 hover:to-siso-orange/90"
        >
          {isAuthenticated ? (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In to Continue
            </>
          )}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {profile.banner_url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-48 rounded-xl overflow-hidden"
        >
          <img 
            src={profile.banner_url} 
            alt="Company Banner" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-6">
        {profile.logo_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 rounded-xl overflow-hidden bg-black/30 flex-shrink-0 p-2"
          >
            <img 
              src={profile.logo_url} 
              alt="Company Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-grow"
        >
          <h2 className="text-2xl font-bold text-siso-text-bold mb-2">
            {profile.company_name || 'Unnamed Company'}
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.company_type && (
              <span className="px-3 py-1 rounded-full bg-siso-orange/10 text-siso-orange text-sm">
                {profile.company_type === 'agency' ? 'Marketing Agency' : 
                 profile.company_type === 'studio' ? 'Creative Studio' :
                 profile.company_type === 'development' ? 'Web Development' :
                 profile.company_type === 'consulting' ? 'Consulting Firm' :
                 profile.company_type}
              </span>
            )}
            
            {profile.industry && (
              <span className="px-3 py-1 rounded-full bg-siso-text/10 text-siso-text text-sm">
                {profile.industry}
              </span>
            )}
            
            {profile.year_founded && (
              <span className="px-3 py-1 rounded-full bg-siso-text/10 text-siso-text text-sm">
                Founded {profile.year_founded}
              </span>
            )}
          </div>
          
          {profile.description && (
            <p className="text-siso-text/80 mb-4">
              {profile.description}
            </p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
      >
        <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.email && (
            <div>
              <p className="text-sm text-siso-text/60">Email</p>
              <p className="text-siso-text">{profile.email}</p>
            </div>
          )}
          
          {profile.phone && (
            <div>
              <p className="text-sm text-siso-text/60">Phone</p>
              <p className="text-siso-text">{profile.phone}</p>
            </div>
          )}
          
          {profile.website && (
            <div>
              <p className="text-sm text-siso-text/60">Website</p>
              <a 
                href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer" 
                className="text-siso-orange hover:underline"
              >
                {profile.website}
              </a>
            </div>
          )}
          
          {profile.location && (
            <div>
              <p className="text-sm text-siso-text/60">Location</p>
              <p className="text-siso-text">{profile.location}</p>
            </div>
          )}
        </div>
      </motion.div>

      {profile.primary_color && profile.secondary_color && profile.accent_color && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Brand Colors</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div 
                className="w-full h-12 rounded-lg mb-2" 
                style={{ backgroundColor: profile.primary_color }}
              ></div>
              <p className="text-sm text-siso-text/60">Primary</p>
              <p className="text-siso-text">{profile.primary_color}</p>
            </div>
            
            <div>
              <div 
                className="w-full h-12 rounded-lg mb-2" 
                style={{ backgroundColor: profile.secondary_color }}
              ></div>
              <p className="text-sm text-siso-text/60">Secondary</p>
              <p className="text-siso-text">{profile.secondary_color}</p>
            </div>
            
            <div>
              <div 
                className="w-full h-12 rounded-lg mb-2" 
                style={{ backgroundColor: profile.accent_color }}
              ></div>
              <p className="text-sm text-siso-text/60">Accent</p>
              <p className="text-siso-text">{profile.accent_color}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
