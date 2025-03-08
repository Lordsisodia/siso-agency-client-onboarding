
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { Building, Briefcase, Mail, Phone, Globe, MapPin, Palette } from 'lucide-react';

export default function CompanyProfile() {
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
        
        <div className="relative z-10 container px-4 py-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Company Profile
            </h1>
            <p className="mt-4 text-lg text-siso-text/80">
              Manage your agency information and preferences for your custom app development
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm sticky top-24">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center mb-4">
                  <Building className="w-10 h-10 text-siso-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Your Agency Name</h3>
                <p className="text-siso-text/70 mb-6">
                  Complete your company profile to help us better understand your needs and customize your app development experience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-siso-orange mr-3" />
                    <span className="text-siso-text/70">Agency Type: Not specified</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-siso-orange mr-3" />
                    <span className="text-siso-text/70">Email: Not specified</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-siso-orange mr-3" />
                    <span className="text-siso-text/70">Phone: Not specified</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-siso-orange mr-3" />
                    <span className="text-siso-text/70">Website: Not specified</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-siso-orange mr-3" />
                    <span className="text-siso-text/70">Location: Not specified</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm mb-8">
                <h3 className="text-xl font-semibold mb-4 text-siso-text-bold flex items-center">
                  <Building className="w-5 h-5 mr-2 text-siso-orange" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Agency Name</label>
                    <input 
                      type="text"
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                      placeholder="Your agency name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Agency Type</label>
                    <select 
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                    >
                      <option value="">Select type</option>
                      <option value="marketing">Marketing Agency</option>
                      <option value="creative">Creative Studio</option>
                      <option value="development">Web Development</option>
                      <option value="consulting">Consulting Firm</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Email</label>
                    <input 
                      type="email"
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                      placeholder="contact@youragency.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Phone</label>
                    <input 
                      type="tel"
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Website</label>
                    <input 
                      type="url"
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                      placeholder="https://youragency.com"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm mb-8">
                <h3 className="text-xl font-semibold mb-4 text-siso-text-bold flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-siso-orange" />
                  Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Address</label>
                    <input 
                      type="text"
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                      placeholder="123 Main St."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">City</label>
                    <input 
                      type="text"
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                      placeholder="New York"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm mb-8">
                <h3 className="text-xl font-semibold mb-4 text-siso-text-bold flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-siso-orange" />
                  Branding
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Primary Color</label>
                    <div className="flex">
                      <input 
                        type="color"
                        className="h-10 w-10 rounded-lg border border-siso-orange/20 bg-transparent cursor-pointer"
                        defaultValue="#ff5722"
                      />
                      <input 
                        type="text"
                        className="flex-1 p-3 ml-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                        placeholder="#ff5722"
                        defaultValue="#ff5722"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Secondary Color</label>
                    <div className="flex">
                      <input 
                        type="color"
                        className="h-10 w-10 rounded-lg border border-siso-orange/20 bg-transparent cursor-pointer"
                        defaultValue="#ffa726"
                      />
                      <input 
                        type="text"
                        className="flex-1 p-3 ml-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                        placeholder="#ffa726"
                        defaultValue="#ffa726"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Logo</label>
                    <div className="border-2 border-dashed border-siso-orange/20 rounded-lg p-6 text-center">
                      <p className="text-siso-text/70 mb-2">Drag and drop your logo here or</p>
                      <button className="px-4 py-2 bg-siso-orange/20 text-siso-orange rounded-lg hover:bg-siso-orange/30 transition-colors">
                        Browse Files
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white font-medium transition-all">
                  Save Profile
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
