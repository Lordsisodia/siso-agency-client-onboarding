
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, MapPin, Globe, Mail, Phone, Palette, Save, Loader2, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface CompanyProfileFormProps {
  initialData?: {
    company_name?: string | null;
    company_type?: string | null;
    industry?: string | null;
    description?: string | null;
    location?: string | null;
    website?: string | null;
    email?: string | null;
    phone?: string | null;
    year_founded?: number | null;
    employee_count?: number | null;
    primary_color?: string | null;
    secondary_color?: string | null;
    accent_color?: string | null;
  };
  onSave?: () => void;
  userId: string;
}

export const CompanyProfileForm = ({ initialData, onSave, userId }: CompanyProfileFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: initialData?.company_name || '',
    company_type: initialData?.company_type || '',
    industry: initialData?.industry || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    website: initialData?.website || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    year_founded: initialData?.year_founded || undefined,
    employee_count: initialData?.employee_count || undefined,
    primary_color: initialData?.primary_color || '#6E59A5',
    secondary_color: initialData?.secondary_color || '#9b87f5',
    accent_color: initialData?.accent_color || '#D6BCFA',
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('company_profiles')
          .update(formData)
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Create new profile
        const { error } = await supabase
          .from('company_profiles')
          .insert([{ ...formData, user_id: userId }]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Company profile saved successfully",
      });

      if (onSave) onSave();
    } catch (error: any) {
      console.error('Error saving company profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save company profile: " + error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <motion.div 
        className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-siso-text-bold flex items-center">
          <Building className="w-5 h-5 mr-2 text-siso-orange" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Company Name</Label>
            <Input 
              value={formData.company_name || ''}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              placeholder="Your company name"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Company Type</Label>
            <Select 
              value={formData.company_type || ''}
              onValueChange={(value) => handleChange('company_type', value)}
            >
              <SelectTrigger className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agency">Marketing Agency</SelectItem>
                <SelectItem value="studio">Creative Studio</SelectItem>
                <SelectItem value="development">Web Development</SelectItem>
                <SelectItem value="consulting">Consulting Firm</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Industry</Label>
            <Input 
              value={formData.industry || ''}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              placeholder="e.g., Technology, Finance, etc."
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Founded Year</Label>
            <Input 
              type="number"
              value={formData.year_founded || ''}
              onChange={(e) => handleChange('year_founded', parseInt(e.target.value) || undefined)}
              className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              placeholder="e.g., 2020"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Description</Label>
            <Textarea 
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none min-h-[100px]"
              placeholder="Tell us about your company..."
            />
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-siso-text-bold flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-siso-orange" />
          Contact & Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Email</Label>
            <Input 
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              placeholder="contact@yourcompany.com"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Phone</Label>
            <Input 
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              placeholder="+1 (123) 456-7890"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Website</Label>
            <Input 
              type="url"
              value={formData.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              placeholder="https://yourcompany.com"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Location</Label>
            <Input 
              value={formData.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              placeholder="City, Country"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Employee Count</Label>
            <Select 
              value={formData.employee_count?.toString() || ''}
              onValueChange={(value) => handleChange('employee_count', parseInt(value) || undefined)}
            >
              <SelectTrigger className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 (Solo)</SelectItem>
                <SelectItem value="5">2-5 employees</SelectItem>
                <SelectItem value="10">6-10 employees</SelectItem>
                <SelectItem value="25">11-25 employees</SelectItem>
                <SelectItem value="50">26-50 employees</SelectItem>
                <SelectItem value="100">51-100 employees</SelectItem>
                <SelectItem value="500">101-500 employees</SelectItem>
                <SelectItem value="1000">500+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-siso-text-bold flex items-center">
          <Palette className="w-5 h-5 mr-2 text-siso-orange" />
          Branding
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Primary Color</Label>
            <div className="flex">
              <Input 
                type="color"
                value={formData.primary_color || '#6E59A5'}
                onChange={(e) => handleChange('primary_color', e.target.value)}
                className="h-10 w-10 rounded-lg border border-siso-orange/20 bg-transparent cursor-pointer"
              />
              <Input 
                type="text"
                value={formData.primary_color || '#6E59A5'}
                onChange={(e) => handleChange('primary_color', e.target.value)}
                className="flex-1 p-3 ml-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Secondary Color</Label>
            <div className="flex">
              <Input 
                type="color"
                value={formData.secondary_color || '#9b87f5'}
                onChange={(e) => handleChange('secondary_color', e.target.value)}
                className="h-10 w-10 rounded-lg border border-siso-orange/20 bg-transparent cursor-pointer"
              />
              <Input 
                type="text"
                value={formData.secondary_color || '#9b87f5'}
                onChange={(e) => handleChange('secondary_color', e.target.value)}
                className="flex-1 p-3 ml-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Accent Color</Label>
            <div className="flex">
              <Input 
                type="color"
                value={formData.accent_color || '#D6BCFA'}
                onChange={(e) => handleChange('accent_color', e.target.value)}
                className="h-10 w-10 rounded-lg border border-siso-orange/20 bg-transparent cursor-pointer"
              />
              <Input 
                type="text"
                value={formData.accent_color || '#D6BCFA'}
                onChange={(e) => handleChange('accent_color', e.target.value)}
                className="flex-1 p-3 ml-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="flex justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button 
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white font-medium transition-all"
        >
          {isLoading ? (
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
      </motion.div>
    </form>
  );
};
