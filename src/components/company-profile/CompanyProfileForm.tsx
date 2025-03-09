import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, MapPin, Globe, Mail, Phone, Palette, Save, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ColorPicker } from './ColorPicker';
import { getContrastTextColor } from '@/utils/colorUtils';

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
  analysisData?: any;
  onSave?: () => void;
  userId: string;
}

export const CompanyProfileForm = ({ initialData, analysisData, onSave, userId }: CompanyProfileFormProps) => {
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
  const [showAnalysisAlert, setShowAnalysisAlert] = useState(false);
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

  // Track which fields were modified by analysis
  const analysisFieldsRef = useRef<Set<string>>(new Set());

  // Apply website analysis data when it becomes available
  useEffect(() => {
    if (!analysisData) return;

    const aiData = analysisData.aiAnalysis || {};
    const basicData = analysisData.basicExtraction || {};
    const updatedData = { ...formData };
    let hasChanges = false;
    const fieldsToHighlight: string[] = [];
    const fieldsModified = new Set<string>();

    // Fill in company_name if available from AI analysis
    if (aiData.companyName && !formData.company_name) {
      updatedData.company_name = aiData.companyName;
      hasChanges = true;
      fieldsToHighlight.push('company_name');
      fieldsModified.add('company_name');
    }

    // Fill in industry if available from AI analysis
    if (aiData.industry && !formData.industry) {
      updatedData.industry = aiData.industry;
      hasChanges = true;
      fieldsToHighlight.push('industry');
      fieldsModified.add('industry');
    }

    // Fill in description if available from AI analysis
    if (aiData.companyDescription && !formData.description) {
      updatedData.description = aiData.companyDescription;
      hasChanges = true;
      fieldsToHighlight.push('description');
      fieldsModified.add('description');
    }

    // Fill in location if available from AI analysis
    if (aiData.location && !formData.location) {
      updatedData.location = aiData.location;
      hasChanges = true;
      fieldsToHighlight.push('location');
      fieldsModified.add('location');
    }

    // Use website that was analyzed
    if (analysisData.url && !formData.website) {
      updatedData.website = analysisData.url;
      hasChanges = true;
      fieldsToHighlight.push('website');
      fieldsModified.add('website');
    }

    // Set email if found
    if (basicData.emails && basicData.emails.length > 0 && !formData.email) {
      updatedData.email = basicData.emails[0];
      hasChanges = true;
      fieldsToHighlight.push('email');
      fieldsModified.add('email');
    }

    // Set phone if found
    if (basicData.phones && basicData.phones.length > 0 && !formData.phone) {
      updatedData.phone = basicData.phones[0];
      hasChanges = true;
      fieldsToHighlight.push('phone');
      fieldsModified.add('phone');
    }

    // Try to extract founded year if mentioned
    if (aiData.yearFounded && !formData.year_founded) {
      const yearMatch = aiData.yearFounded.toString().match(/\b(19|20)\d{2}\b/);
      if (yearMatch) {
        updatedData.year_founded = parseInt(yearMatch[0]);
        hasChanges = true;
        fieldsToHighlight.push('year_founded');
        fieldsModified.add('year_founded');
      }
    }

    // Estimate company type based on services/products
    if (aiData.productsOrServices && !formData.company_type) {
      const services = aiData.productsOrServices.toLowerCase();
      if (services.includes('market') || services.includes('advertising')) {
        updatedData.company_type = 'agency';
        hasChanges = true;
        fieldsToHighlight.push('company_type');
        fieldsModified.add('company_type');
      } else if (services.includes('design') || services.includes('creative')) {
        updatedData.company_type = 'studio';
        hasChanges = true;
        fieldsToHighlight.push('company_type');
        fieldsModified.add('company_type');
      } else if (services.includes('develop') || services.includes('software') || services.includes('web')) {
        updatedData.company_type = 'development';
        hasChanges = true;
        fieldsToHighlight.push('company_type');
        fieldsModified.add('company_type');
      } else if (services.includes('consult') || services.includes('advisory')) {
        updatedData.company_type = 'consulting';
        hasChanges = true;
        fieldsToHighlight.push('company_type');
        fieldsModified.add('company_type');
      }
    }

    // Detect brand colors if available
    const colors = basicData.colors || [];
    if (colors.length >= 3 && (!formData.primary_color || formData.primary_color === '#6E59A5')) {
      // Use the first three colors for primary, secondary, and accent
      updatedData.primary_color = colors[0] || '#6E59A5';
      updatedData.secondary_color = colors[1] || '#9b87f5';
      updatedData.accent_color = colors[2] || '#D6BCFA';
      hasChanges = true;
      fieldsToHighlight.push('primary_color', 'secondary_color', 'accent_color');
      fieldsModified.add('primary_color');
      fieldsModified.add('secondary_color');
      fieldsModified.add('accent_color');
    }

    if (hasChanges) {
      setFormData(updatedData);
      setShowAnalysisAlert(true);
      setHighlightedFields(fieldsToHighlight);
      analysisFieldsRef.current = fieldsModified;
      
      // Auto-hide the analysis alert after a while
      setTimeout(() => {
        setShowAnalysisAlert(false);
      }, 8000);
    }
  }, [analysisData]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Remove highlighting when the user manually edits a field
    if (highlightedFields.includes(field)) {
      setHighlightedFields(prev => prev.filter(f => f !== field));
    }
  };

  const getFieldClassName = (field: string) => {
    const baseClass = "w-full p-3 rounded-lg bg-black/20 border text-siso-text focus:border-siso-orange/50 focus:outline-none";
    if (highlightedFields.includes(field)) {
      return `${baseClass} border-green-500/50 bg-green-500/5`;
    }
    return `${baseClass} border-siso-orange/20`;
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

  // Get suggested colors based on industry
  const getSuggestedColors = (field: string) => {
    const industryColorMap: Record<string, Record<string, string[]>> = {
      'Technology': {
        primary: ['#0F172A', '#1E40AF', '#1E293B', '#3B82F6', '#1A202C'],
        secondary: ['#6366F1', '#3B82F6', '#2563EB', '#4F46E5', '#8B5CF6'],
        accent: ['#22D3EE', '#38BDF8', '#A5F3FC', '#7DD3FC', '#BAE6FD']
      },
      'Finance': {
        primary: ['#0F766E', '#065F46', '#064E3B', '#0E7490', '#0C4A6E'],
        secondary: ['#059669', '#0D9488', '#0891B2', '#0284C7', '#2DD4BF'],
        accent: ['#14B8A6', '#10B981', '#34D399', '#22D3EE', '#4ADE80']
      },
      'Creative': {
        primary: ['#9333EA', '#C026D3', '#7E22CE', '#6D28D9', '#A21CAF'],
        secondary: ['#D946EF', '#E879F9', '#A855F7', '#8B5CF6', '#C084FC'],
        accent: ['#F0ABFC', '#F5D0FE', '#DDD6FE', '#C4B5FD', '#E9D5FF']
      },
      'Retail': {
        primary: ['#EA580C', '#C2410C', '#9A3412', '#D97706', '#B45309'],
        secondary: ['#F97316', '#FB923C', '#FDBA74', '#F59E0B', '#FCD34D'],
        accent: ['#FFEDD5', '#FED7AA', '#FEF3C7', '#FDE68A', '#FEF9C3']
      }
    };
    
    // Default colors if industry not found
    const defaultColors = {
      primary: ['#6E59A5', '#1F2937', '#047857', '#7C3AED', '#BE123C'],
      secondary: ['#9b87f5', '#4B5563', '#10B981', '#8B5CF6', '#E11D48'],
      accent: ['#D6BCFA', '#9CA3AF', '#A7F3D0', '#C4B5FD', '#FECDD3']
    };
    
    const industry = formData.industry?.toLowerCase() || '';
    
    if (industry.includes('tech') || industry.includes('software') || industry.includes('digital')) {
      return industryColorMap['Technology'][field] || [];
    } else if (industry.includes('finance') || industry.includes('bank') || industry.includes('insurance')) {
      return industryColorMap['Finance'][field] || [];
    } else if (industry.includes('design') || industry.includes('art') || industry.includes('media') || industry.includes('creative')) {
      return industryColorMap['Creative'][field] || [];
    } else if (industry.includes('retail') || industry.includes('shop') || industry.includes('store') || industry.includes('consumer')) {
      return industryColorMap['Retail'][field] || [];
    }
    
    return defaultColors[field as keyof typeof defaultColors] || [];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {showAnalysisAlert && (
        <motion.div 
          className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <AlertCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-500">Website Analysis Complete</h4>
            <p className="text-sm text-siso-text/80">
              {highlightedFields.length} fields have been pre-filled based on your website analysis. 
              These fields are highlighted in green. You can review and edit them before saving.
            </p>
          </div>
        </motion.div>
      )}

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
              className={getFieldClassName('company_name')}
              placeholder="Your company name"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Company Type</Label>
            <Select 
              value={formData.company_type || ''}
              onValueChange={(value) => handleChange('company_type', value)}
            >
              <SelectTrigger className={getFieldClassName('company_type')}>
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
              className={getFieldClassName('industry')}
              placeholder="e.g., Technology, Finance, etc."
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Founded Year</Label>
            <Input 
              type="number"
              value={formData.year_founded || ''}
              onChange={(e) => handleChange('year_founded', parseInt(e.target.value) || undefined)}
              className={getFieldClassName('year_founded')}
              placeholder="e.g., 2020"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Description</Label>
            <Textarea 
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className={getFieldClassName('description')}
              placeholder="Tell us about your company..."
              rows={5}
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
              className={getFieldClassName('email')}
              placeholder="contact@yourcompany.com"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Phone</Label>
            <Input 
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={getFieldClassName('phone')}
              placeholder="+1 (123) 456-7890"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Website</Label>
            <Input 
              type="url"
              value={formData.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              className={getFieldClassName('website')}
              placeholder="https://yourcompany.com"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Location</Label>
            <Input 
              value={formData.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              className={getFieldClassName('location')}
              placeholder="City, Country"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-siso-text/70 mb-2">Employee Count</Label>
            <Select 
              value={formData.employee_count?.toString() || ''}
              onValueChange={(value) => handleChange('employee_count', parseInt(value) || undefined)}
            >
              <SelectTrigger className={getFieldClassName('employee_count')}>
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
          <ColorPicker
            label="Primary Color"
            color={formData.primary_color || '#6E59A5'}
            onChange={(value) => handleChange('primary_color', value)}
            isHighlighted={highlightedFields.includes('primary_color')}
            suggestedColors={getSuggestedColors('primary')}
          />
          
          <ColorPicker
            label="Secondary Color"
            color={formData.secondary_color || '#9b87f5'}
            onChange={(value) => handleChange('secondary_color', value)}
            isHighlighted={highlightedFields.includes('secondary_color')}
            suggestedColors={getSuggestedColors('secondary')}
          />
          
          <ColorPicker
            label="Accent Color"
            color={formData.accent_color || '#D6BCFA'}
            onChange={(value) => handleChange('accent_color', value)}
            isHighlighted={highlightedFields.includes('accent_color')}
            suggestedColors={getSuggestedColors('accent')}
          />
          
          <div className="md:col-span-3">
            <p className="text-sm text-siso-text/70 mb-4">Preview your brand colors together:</p>
            <div className="p-4 rounded-lg border border-siso-orange/10 bg-black/10">
              <div className="flex flex-col space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: formData.primary_color || '#6E59A5' }}>
                  <h4 className="text-lg font-semibold" style={{ color: getContrastTextColor(formData.primary_color || '#6E59A5') }}>
                    Primary Color
                  </h4>
                  <p style={{ color: getContrastTextColor(formData.primary_color || '#6E59A5', 0.8) }}>
                    This is how text would look on your primary color background.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px] p-4 rounded-lg"
                    style={{ backgroundColor: formData.secondary_color || '#9b87f5' }}
                  >
                    <h4 className="font-medium" style={{ color: getContrastTextColor(formData.secondary_color || '#9b87f5') }}>
                      Secondary
                    </h4>
                    <p className="text-sm" style={{ color: getContrastTextColor(formData.secondary_color || '#9b87f5', 0.8) }}>
                      Secondary text
                    </p>
                  </div>
                  
                  <div className="flex-1 min-w-[150px] p-4 rounded-lg"
                    style={{ backgroundColor: formData.accent_color || '#D6BCFA' }}
                  >
                    <h4 className="font-medium" style={{ color: getContrastTextColor(formData.accent_color || '#D6BCFA') }}>
                      Accent
                    </h4>
                    <p className="text-sm" style={{ color: getContrastTextColor(formData.accent_color || '#D6BCFA', 0.8) }}>
                      Accent text
                    </p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: formData.primary_color || '#6E59A5' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: formData.secondary_color || '#9b87f5' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: formData.accent_color || '#D6BCFA' }}></div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Example UI element</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button className="text-xs" style={{ backgroundColor: formData.primary_color || '#6E59A5', color: getContrastTextColor(formData.primary_color || '#6E59A5') }}>
                      Primary Button
                    </Button>
                    <Button variant="outline" className="text-xs" style={{ borderColor: formData.secondary_color || '#9b87f5', color: formData.secondary_color || '#9b87f5' }}>
                      Secondary Button
                    </Button>
                    <div className="text-xs" style={{ color: formData.accent_color || '#D6BCFA' }}>
                      Accent Text
                    </div>
                  </div>
                </div>
              </div>
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
