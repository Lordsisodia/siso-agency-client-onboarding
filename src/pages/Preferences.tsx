
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Moon, 
  Sun, 
  Settings, 
  Shield, 
  Save,
  Loader2
} from 'lucide-react';
import { useViewportLoading } from '@/hooks/useViewportLoading';
import { motion } from 'framer-motion';

export default function Preferences() {
  const { toast } = useToast();
  const { elementRef, isLoaded } = useViewportLoading();
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock preferences state (would connect to actual user preferences in production)
  const [preferences, setPreferences] = useState({
    appearance: {
      theme: 'system',
      reducedMotion: false,
      fontSize: 14
    },
    notifications: {
      email: {
        projectUpdates: true,
        taskReminders: true,
        weeklyDigest: true,
        marketingEmails: false
      },
      inApp: {
        projectUpdates: true,
        taskReminders: true,
        pointsEarned: true,
        newFeatures: true
      }
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30 // minutes
    }
  });

  const handleThemeChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: value
      }
    }));
  };

  const handleToggleChange = (section: string, subsection: string | null, setting: string, value: boolean) => {
    if (subsection) {
      setPreferences(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [subsection]: {
            ...(prev[section as keyof typeof prev] as any)[subsection],
            [setting]: value
          }
        }
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [setting]: value
        }
      }));
    }
  };

  const handleSliderChange = (section: string, setting: string, value: number[]) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [setting]: value[0]
      }
    }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully."
    });
    
    setIsSaving(false);
  };

  return (
    <ProfileLayout>
      <Helmet>
        <title>Preferences | SISO</title>
        <meta name="description" content="Manage your account preferences and settings" />
      </Helmet>
      
      <div className="space-y-8" ref={elementRef}>
        <div className="flex flex-col space-y-1.5">
          <h1 className="text-2xl font-bold text-siso-text-bold tracking-tight">User Preferences</h1>
          <p className="text-siso-text/70">Customize your experience with SISO</p>
        </div>
        
        {isLoaded && (
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="bg-siso-bg-alt mb-6">
              <TabsTrigger value="appearance" className="data-[state=active]:bg-siso-orange/10 data-[state=active]:text-siso-orange">
                <Settings className="w-4 h-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-siso-orange/10 data-[state=active]:text-siso-orange">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-siso-orange/10 data-[state=active]:text-siso-orange">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-black/20 border-siso-text/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium text-siso-text-bold">Appearance Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-siso-text-bold">Theme</h3>
                      <div className="flex space-x-2">
                        <Button 
                          variant={preferences.appearance.theme === 'light' ? 'default' : 'outline'} 
                          size="sm" 
                          className={preferences.appearance.theme === 'light' ? 'bg-siso-orange text-white' : ''}
                          onClick={() => handleThemeChange('light')}
                        >
                          <Sun className="w-4 h-4 mr-2" />
                          Light
                        </Button>
                        <Button 
                          variant={preferences.appearance.theme === 'dark' ? 'default' : 'outline'} 
                          size="sm"
                          className={preferences.appearance.theme === 'dark' ? 'bg-siso-orange text-white' : ''}
                          onClick={() => handleThemeChange('dark')}
                        >
                          <Moon className="w-4 h-4 mr-2" />
                          Dark
                        </Button>
                        <Button 
                          variant={preferences.appearance.theme === 'system' ? 'default' : 'outline'} 
                          size="sm"
                          className={preferences.appearance.theme === 'system' ? 'bg-siso-orange text-white' : ''}
                          onClick={() => handleThemeChange('system')}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          System
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-siso-text-bold">Reduced Motion</h3>
                          <p className="text-xs text-siso-text/70">Minimize animations throughout the interface</p>
                        </div>
                        <Switch 
                          checked={preferences.appearance.reducedMotion}
                          onCheckedChange={(checked) => handleToggleChange('appearance', null, 'reducedMotion', checked)}
                          className="data-[state=checked]:bg-siso-orange"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-siso-text-bold">Font Size: {preferences.appearance.fontSize}px</h3>
                        </div>
                        <Slider
                          value={[preferences.appearance.fontSize]}
                          min={12}
                          max={20}
                          step={1}
                          onValueChange={(value) => handleSliderChange('appearance', 'fontSize', value)}
                          className="py-4"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-black/20 border-siso-text/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium text-siso-text-bold">Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">Project Updates</h3>
                        <p className="text-xs text-siso-text/70">Get notified about changes to your projects</p>
                      </div>
                      <Switch 
                        checked={preferences.notifications.email.projectUpdates}
                        onCheckedChange={(checked) => handleToggleChange('notifications', 'email', 'projectUpdates', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">Task Reminders</h3>
                        <p className="text-xs text-siso-text/70">Receive reminders about upcoming tasks</p>
                      </div>
                      <Switch 
                        checked={preferences.notifications.email.taskReminders}
                        onCheckedChange={(checked) => handleToggleChange('notifications', 'email', 'taskReminders', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">Weekly Digest</h3>
                        <p className="text-xs text-siso-text/70">Weekly summary of activity and progress</p>
                      </div>
                      <Switch 
                        checked={preferences.notifications.email.weeklyDigest}
                        onCheckedChange={(checked) => handleToggleChange('notifications', 'email', 'weeklyDigest', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">Marketing Emails</h3>
                        <p className="text-xs text-siso-text/70">Stay updated with our latest news and offers</p>
                      </div>
                      <Switch 
                        checked={preferences.notifications.email.marketingEmails}
                        onCheckedChange={(checked) => handleToggleChange('notifications', 'email', 'marketingEmails', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="bg-black/20 border-siso-text/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium text-siso-text-bold">In-App Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">Project Updates</h3>
                        <p className="text-xs text-siso-text/70">Get notified in-app about project changes</p>
                      </div>
                      <Switch 
                        checked={preferences.notifications.inApp.projectUpdates}
                        onCheckedChange={(checked) => handleToggleChange('notifications', 'inApp', 'projectUpdates', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">Task Reminders</h3>
                        <p className="text-xs text-siso-text/70">Receive in-app reminders about tasks</p>
                      </div>
                      <Switch 
                        checked={preferences.notifications.inApp.taskReminders}
                        onCheckedChange={(checked) => handleToggleChange('notifications', 'inApp', 'taskReminders', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">Points Earned</h3>
                        <p className="text-xs text-siso-text/70">Get notified when you earn points</p>
                      </div>
                      <Switch 
                        checked={preferences.notifications.inApp.pointsEarned}
                        onCheckedChange={(checked) => handleToggleChange('notifications', 'inApp', 'pointsEarned', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">New Features</h3>
                        <p className="text-xs text-siso-text/70">Be the first to know about new features</p>
                      </div>
                      <Switch 
                        checked={preferences.notifications.inApp.newFeatures}
                        onCheckedChange={(checked) => handleToggleChange('notifications', 'inApp', 'newFeatures', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-black/20 border-siso-text/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium text-siso-text-bold">Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-siso-text-bold">Two-Factor Authentication</h3>
                        <p className="text-xs text-siso-text/70">Add an extra layer of security to your account</p>
                      </div>
                      <Switch 
                        checked={preferences.security.twoFactorAuth}
                        onCheckedChange={(checked) => handleToggleChange('security', null, 'twoFactorAuth', checked)}
                        className="data-[state=checked]:bg-siso-orange"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-siso-text-bold">Session Timeout: {preferences.security.sessionTimeout} minutes</h3>
                      </div>
                      <p className="text-xs text-siso-text/70">Automatically log out after period of inactivity</p>
                      <Slider
                        value={[preferences.security.sessionTimeout]}
                        min={5}
                        max={120}
                        step={5}
                        onValueChange={(value) => handleSliderChange('security', 'sessionTimeout', value)}
                        className="py-4"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        )}
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSavePreferences}
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
                Save Preferences
              </>
            )}
          </Button>
        </div>
      </div>
    </ProfileLayout>
  );
}
