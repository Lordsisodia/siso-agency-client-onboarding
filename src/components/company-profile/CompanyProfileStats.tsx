
import { Building, Users, Calendar, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompanyProfileStatsProps {
  companyName?: string | null;
  yearFounded?: number | null;
  employeeCount?: number | null;
  industry?: string | null;
  companyType?: string | null;
}

export const CompanyProfileStats = ({ 
  companyName, 
  yearFounded, 
  employeeCount, 
  industry,
  companyType
}: CompanyProfileStatsProps) => {
  const getEmployeeCountText = (count?: number | null) => {
    if (!count) return 'Not specified';
    
    if (count === 1) return '1 employee (Solo)';
    if (count <= 5) return '2-5 employees';
    if (count <= 10) return '6-10 employees';
    if (count <= 25) return '11-25 employees';
    if (count <= 50) return '26-50 employees';
    if (count <= 100) return '51-100 employees';
    if (count <= 500) return '101-500 employees';
    return '500+ employees';
  };

  const getCompanyAge = (year?: number | null) => {
    if (!year) return 'Not specified';
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    
    if (age <= 0) return 'Founded this year';
    if (age === 1) return '1 year in business';
    return `${age} years in business`;
  };

  const getCompanyTypeText = (type?: string | null) => {
    if (!type) return 'Not specified';
    
    switch (type) {
      case 'agency': return 'Marketing Agency';
      case 'studio': return 'Creative Studio';
      case 'development': return 'Web Development';
      case 'consulting': return 'Consulting Firm';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <motion.div 
      className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm sticky top-24"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-siso-red/20 to-siso-orange/20 flex items-center justify-center mb-4">
        <Building className="w-10 h-10 text-siso-orange" />
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">
        {companyName || 'Your Company'}
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Briefcase className="w-5 h-5 text-siso-orange mr-3" />
          <span className="text-siso-text/90">Type: {getCompanyTypeText(companyType)}</span>
        </div>
        
        <div className="flex items-center">
          <Award className="w-5 h-5 text-siso-orange mr-3" />
          <span className="text-siso-text/90">Industry: {industry || 'Not specified'}</span>
        </div>
        
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-siso-orange mr-3" />
          <span className="text-siso-text/90">{getCompanyAge(yearFounded)}</span>
        </div>
        
        <div className="flex items-center">
          <Users className="w-5 h-5 text-siso-orange mr-3" />
          <span className="text-siso-text/90">{getEmployeeCountText(employeeCount)}</span>
        </div>
      </div>
    </motion.div>
  );
};
