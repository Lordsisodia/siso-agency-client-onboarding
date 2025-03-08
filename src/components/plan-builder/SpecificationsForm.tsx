
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Save, Download } from 'lucide-react';

interface SpecificationsFormProps {
  onNext: (data: SpecificationsData) => void;
  onBack: () => void;
  initialData?: SpecificationsData;
}

export interface SpecificationsData {
  detailedSpecifications: string;
  designNotes: string;
  integrationNotes: string;
}

export function SpecificationsForm({ onNext, onBack, initialData }: SpecificationsFormProps) {
  const [formData, setFormData] = useState<SpecificationsData>(initialData || {
    detailedSpecifications: '',
    designNotes: '',
    integrationNotes: ''
  });
  
  const [activeTab, setActiveTab] = useState('specifications');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (
    field: keyof SpecificationsData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    onNext(formData);
  };
  
  const simulateSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-siso-text-bold mb-2">Detailed Specifications</h2>
        <p className="text-siso-text/70">Document the detailed requirements and specifications for your project</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-siso-orange" />
          <h3 className="text-lg font-semibold">Project Specification Document</h3>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={simulateSave}
            className="text-xs flex items-center gap-1 border-siso-border/60"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-siso-text" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save size={14} />
                Save Draft
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1 border-siso-border/60"
          >
            <Download size={14} />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full border border-siso-border/70 rounded-lg overflow-hidden bg-siso-bg/20 backdrop-blur-sm"
      >
        <TabsList className="w-full bg-siso-bg/50 border-b border-siso-border/70 rounded-none p-0">
          <TabsTrigger 
            value="specifications" 
            className="flex-1 rounded-none data-[state=active]:bg-siso-bg/80 data-[state=active]:text-siso-text-bold py-3"
          >
            Functional Specifications
          </TabsTrigger>
          <TabsTrigger 
            value="design" 
            className="flex-1 rounded-none data-[state=active]:bg-siso-bg/80 data-[state=active]:text-siso-text-bold py-3"
          >
            Design Notes
          </TabsTrigger>
          <TabsTrigger 
            value="integration" 
            className="flex-1 rounded-none data-[state=active]:bg-siso-bg/80 data-[state=active]:text-siso-text-bold py-3"
          >
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <div className="p-4">
          <TabsContent value="specifications" className="mt-0">
            <Label htmlFor="detailedSpecifications" className="sr-only">Detailed Specifications</Label>
            <textarea
              id="detailedSpecifications"
              value={formData.detailedSpecifications}
              onChange={(e) => handleChange('detailedSpecifications', e.target.value)}
              placeholder="Enter detailed functional specifications for your project. Include user flows, features, and business logic requirements..."
              className="w-full min-h-[400px] p-3 bg-siso-bg/40 border border-siso-border/60 rounded-md focus:border-siso-orange/60 focus:ring-1 focus:ring-siso-orange/20 outline-none text-sm"
            />
          </TabsContent>
          
          <TabsContent value="design" className="mt-0">
            <Label htmlFor="designNotes" className="sr-only">Design Notes</Label>
            <textarea
              id="designNotes"
              value={formData.designNotes}
              onChange={(e) => handleChange('designNotes', e.target.value)}
              placeholder="Describe your design preferences, branding guidelines, color schemes, and any UI/UX requirements..."
              className="w-full min-h-[400px] p-3 bg-siso-bg/40 border border-siso-border/60 rounded-md focus:border-siso-orange/60 focus:ring-1 focus:ring-siso-orange/20 outline-none text-sm"
            />
          </TabsContent>
          
          <TabsContent value="integration" className="mt-0">
            <Label htmlFor="integrationNotes" className="sr-only">Integration Notes</Label>
            <textarea
              id="integrationNotes"
              value={formData.integrationNotes}
              onChange={(e) => handleChange('integrationNotes', e.target.value)}
              placeholder="List any third-party services, APIs, or existing systems that need to be integrated with your project..."
              className="w-full min-h-[400px] p-3 bg-siso-bg/40 border border-siso-border/60 rounded-md focus:border-siso-orange/60 focus:ring-1 focus:ring-siso-orange/20 outline-none text-sm"
            />
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="pt-6 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="border-siso-border text-siso-text"
        >
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
        >
          Continue to Summary
        </Button>
      </div>
    </motion.div>
  );
}
