
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BasicInfoData } from './BasicInfoForm';
import { RequirementsData } from './RequirementsForm';
import { FeaturesData, Feature } from './FeaturesForm';
import { SpecificationsData } from './SpecificationsForm';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { toast } from '@/components/ui/use-toast';
import { 
  Check, 
  Download, 
  Edit, 
  FileText, 
  User, 
  Building, 
  Globe, 
  Mail, 
  Calendar, 
  Target, 
  List, 
  PackageOpen
} from 'lucide-react';

interface SummaryViewProps {
  basicInfo: BasicInfoData;
  requirements: RequirementsData;
  features: FeaturesData;
  specifications: SpecificationsData;
  onBack: () => void;
  onSubmit: () => void;
  onEdit: (step: number) => void;
}

export function SummaryView({
  basicInfo,
  requirements,
  features,
  specifications,
  onBack,
  onSubmit,
  onEdit
}: SummaryViewProps) {
  const handleSubmit = () => {
    toast({
      title: "Plan submitted successfully!",
      description: "We'll review your plan and get back to you shortly.",
    });
    onSubmit();
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
        <h2 className="text-2xl font-bold text-siso-text-bold mb-2">Project Plan Summary</h2>
        <p className="text-siso-text/70">Review your project details before final submission</p>
      </div>
      
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-8">
          {/* Basic Info Section */}
          <div className="bg-black/20 border border-siso-border/30 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <FileText size={18} className="text-siso-orange mr-2" />
                <h3 className="text-lg font-semibold text-siso-text-bold">Project Information</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit(0)}
                className="text-xs flex items-center gap-1 text-siso-orange hover:text-siso-red"
              >
                <Edit size={14} />
                Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-siso-text/70">Project Name</p>
                  <p className="font-medium">{basicInfo.projectName}</p>
                </div>
                
                <div className="flex items-start gap-1.5">
                  <Building size={16} className="text-siso-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-siso-text/70">Company/Organization</p>
                    <p className="font-medium">{basicInfo.companyName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-1.5">
                  <User size={16} className="text-siso-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-siso-text/70">Contact Person</p>
                    <p className="font-medium">{basicInfo.contactName}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-1.5">
                  <Mail size={16} className="text-siso-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-siso-text/70">Contact Email</p>
                    <p className="font-medium">{basicInfo.contactEmail}</p>
                  </div>
                </div>
                
                {basicInfo.website && (
                  <div className="flex items-start gap-1.5">
                    <Globe size={16} className="text-siso-orange shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-siso-text/70">Website</p>
                      <p className="font-medium">{basicInfo.website}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-siso-text/70">Project Overview</p>
              <p className="text-sm mt-1">{basicInfo.overview}</p>
            </div>
          </div>
          
          {/* Requirements Section */}
          <div className="bg-black/20 border border-siso-border/30 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Target size={18} className="text-siso-orange mr-2" />
                <h3 className="text-lg font-semibold text-siso-text-bold">Goals & Requirements</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit(1)}
                className="text-xs flex items-center gap-1 text-siso-orange hover:text-siso-red"
              >
                <Edit size={14} />
                Edit
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-siso-text-bold">Project Goals</h4>
                <ul className="space-y-1">
                  {requirements.goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={16} className="text-siso-orange mt-0.5 shrink-0" />
                      <span className="text-sm">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-siso-text-bold">Specific Requirements</h4>
                <ul className="space-y-1">
                  {requirements.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={16} className="text-siso-orange mt-0.5 shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 text-siso-text-bold">Target Audience</h4>
                <p className="text-sm">{requirements.targetAudience}</p>
              </div>
              
              {requirements.targetLaunchDate && (
                <div className="flex items-start gap-1.5">
                  <Calendar size={16} className="text-siso-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-siso-text/70">Target Launch Date</p>
                    <p className="font-medium">{formatDate(new Date(requirements.targetLaunchDate))}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Features Section */}
          <div className="bg-black/20 border border-siso-border/30 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <PackageOpen size={18} className="text-siso-orange mr-2" />
                <h3 className="text-lg font-semibold text-siso-text-bold">Selected Features</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit(2)}
                className="text-xs flex items-center gap-1 text-siso-orange hover:text-siso-red"
              >
                <Edit size={14} />
                Edit
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.selectedFeatures.map((feature) => (
                  <div key={feature.id} className="flex justify-between items-start bg-siso-bg/30 p-3 rounded-md border border-siso-border/30">
                    <div className="flex-1">
                      <h4 className="font-medium text-siso-text-bold">{feature.name}</h4>
                      <p className="text-xs text-siso-text/70 mt-0.5">{feature.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-siso-orange">
                      {formatCurrency(feature.baseCost)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center p-3 border-t border-siso-border/30 mt-2 pt-4">
                <span className="font-medium">Total Estimated Cost:</span>
                <span className="text-xl font-bold text-siso-orange">
                  {formatCurrency(features.totalCost)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Specifications Section */}
          <div className="bg-black/20 border border-siso-border/30 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <List size={18} className="text-siso-orange mr-2" />
                <h3 className="text-lg font-semibold text-siso-text-bold">Technical Specifications</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit(3)}
                className="text-xs flex items-center gap-1 text-siso-orange hover:text-siso-red"
              >
                <Edit size={14} />
                Edit
              </Button>
            </div>
            
            {specifications.detailedSpecifications ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-siso-text-bold">Functional Specifications</h4>
                  <div className="bg-siso-bg/30 p-3 rounded-md border border-siso-border/30 text-sm whitespace-pre-line">
                    {specifications.detailedSpecifications}
                  </div>
                </div>
                
                {specifications.designNotes && (
                  <div>
                    <h4 className="font-medium mb-2 text-siso-text-bold">Design Notes</h4>
                    <div className="bg-siso-bg/30 p-3 rounded-md border border-siso-border/30 text-sm whitespace-pre-line">
                      {specifications.designNotes}
                    </div>
                  </div>
                )}
                
                {specifications.integrationNotes && (
                  <div>
                    <h4 className="font-medium mb-2 text-siso-text-bold">Integration Notes</h4>
                    <div className="bg-siso-bg/30 p-3 rounded-md border border-siso-border/30 text-sm whitespace-pre-line">
                      {specifications.integrationNotes}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-siso-text/50 italic">No detailed specifications provided.</p>
            )}
          </div>
        </div>
      </ScrollArea>
      
      <div className="pt-8 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="border-siso-border text-siso-text"
        >
          Back
        </Button>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="border-siso-border text-siso-text flex items-center gap-1.5"
          >
            <Download size={16} />
            Export as PDF
          </Button>
          
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
          >
            Submit Plan
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
