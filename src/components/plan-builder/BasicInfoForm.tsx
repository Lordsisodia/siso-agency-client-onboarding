
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Building, User, Globe, FileText } from 'lucide-react';

interface BasicInfoFormProps {
  onNext: (data: BasicInfoData) => void;
  initialData?: BasicInfoData;
}

export interface BasicInfoData {
  projectName: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  website?: string;
  overview: string;
}

export function BasicInfoForm({ onNext, initialData }: BasicInfoFormProps) {
  const [formData, setFormData] = useState<BasicInfoData>(initialData || {
    projectName: '',
    companyName: '',
    contactName: '',
    contactEmail: '',
    website: '',
    overview: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-siso-text-bold mb-2">Basic Project Information</h2>
        <p className="text-siso-text/70">Tell us about your project and your organization</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName" className="flex items-center">
                <FileText size={16} className="mr-2 text-siso-orange" />
                Project Name
              </Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Enter your project name"
                value={formData.projectName}
                onChange={handleChange}
                required
                className="bg-siso-bg/30 border-siso-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center">
                <Building size={16} className="mr-2 text-siso-orange" />
                Company/Organization Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Enter your company or organization name"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="bg-siso-bg/30 border-siso-border"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName" className="flex items-center">
                <User size={16} className="mr-2 text-siso-orange" />
                Contact Person
              </Label>
              <Input
                id="contactName"
                name="contactName"
                placeholder="Enter contact person's name"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="bg-siso-bg/30 border-siso-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 text-siso-orange"
                >
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                </svg>
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="Enter contact email address"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="bg-siso-bg/30 border-siso-border"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center">
              <Globe size={16} className="mr-2 text-siso-orange" />
              Website (Optional)
            </Label>
            <Input
              id="website"
              name="website"
              placeholder="https://example.com"
              value={formData.website}
              onChange={handleChange}
              className="bg-siso-bg/30 border-siso-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="overview" className="flex items-center">
              <FileText size={16} className="mr-2 text-siso-orange" />
              Project Overview
            </Label>
            <Textarea
              id="overview"
              name="overview"
              placeholder="Briefly describe your project, its goals, and what problem it solves..."
              value={formData.overview}
              onChange={handleChange}
              required
              className="min-h-[120px] bg-siso-bg/30 border-siso-border"
            />
          </div>
        </div>
        
        <div className="pt-5 flex justify-end">
          <Button 
            type="submit"
            className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
          >
            Continue to Requirements
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
