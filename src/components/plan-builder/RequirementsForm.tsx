
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Plus, Trash, List, Target, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RequirementsFormProps {
  onNext: (data: RequirementsData) => void;
  onBack: () => void;
  initialData?: RequirementsData;
}

export interface RequirementsData {
  goals: string[];
  requirements: string[];
  targetAudience: string;
  targetLaunchDate?: string;
}

export function RequirementsForm({ onNext, onBack, initialData }: RequirementsFormProps) {
  const [formData, setFormData] = useState<RequirementsData>(initialData || {
    goals: [''],
    requirements: [''],
    targetAudience: '',
    targetLaunchDate: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGoalChange = (index: number, value: string) => {
    setFormData(prev => {
      const updatedGoals = [...prev.goals];
      updatedGoals[index] = value;
      return { ...prev, goals: updatedGoals };
    });
  };
  
  const handleRequirementChange = (index: number, value: string) => {
    setFormData(prev => {
      const updatedRequirements = [...prev.requirements];
      updatedRequirements[index] = value;
      return { ...prev, requirements: updatedRequirements };
    });
  };
  
  const addGoal = () => {
    setFormData(prev => ({
      ...prev,
      goals: [...prev.goals, '']
    }));
  };
  
  const removeGoal = (index: number) => {
    if (formData.goals.length <= 1) return;
    setFormData(prev => {
      const updatedGoals = [...prev.goals];
      updatedGoals.splice(index, 1);
      return { ...prev, goals: updatedGoals };
    });
  };
  
  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };
  
  const removeRequirement = (index: number) => {
    if (formData.requirements.length <= 1) return;
    setFormData(prev => {
      const updatedRequirements = [...prev.requirements];
      updatedRequirements.splice(index, 1);
      return { ...prev, requirements: updatedRequirements };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty goals and requirements
    const filteredData = {
      ...formData,
      goals: formData.goals.filter(goal => goal.trim() !== ''),
      requirements: formData.requirements.filter(req => req.trim() !== '')
    };
    onNext(filteredData);
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
        <h2 className="text-2xl font-bold text-siso-text-bold mb-2">Project Requirements</h2>
        <p className="text-siso-text/70">Define your project goals and specific requirements</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="space-y-3">
            <Label className="text-base flex items-center font-semibold">
              <Target size={18} className="mr-2 text-siso-orange" />
              Project Goals
            </Label>
            <p className="text-xs text-siso-text/70 -mt-1">What are the main objectives of your project?</p>
            
            {formData.goals.map((goal, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Textarea
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    placeholder={`Goal ${index + 1}: e.g., Increase user engagement by 30%`}
                    className="bg-siso-bg/30 border-siso-border min-h-[60px]"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeGoal(index)}
                  className={cn(
                    "px-2 h-10 border-siso-border",
                    formData.goals.length <= 1 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={formData.goals.length <= 1}
                >
                  <Trash size={16} className="text-red-500" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addGoal}
              className="mt-2 border-dashed border-siso-border/70 text-siso-text/70"
            >
              <Plus size={16} className="mr-1" /> Add Another Goal
            </Button>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base flex items-center font-semibold">
              <List size={18} className="mr-2 text-siso-orange" />
              Specific Requirements
            </Label>
            <p className="text-xs text-siso-text/70 -mt-1">List key functionalities or features your app must have</p>
            
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Textarea
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}: e.g., User login and registration system`}
                    className="bg-siso-bg/30 border-siso-border min-h-[60px]"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRequirement(index)}
                  className={cn(
                    "px-2 h-10 border-siso-border",
                    formData.requirements.length <= 1 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={formData.requirements.length <= 1}
                >
                  <Trash size={16} className="text-red-500" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRequirement}
              className="mt-2 border-dashed border-siso-border/70 text-siso-text/70"
            >
              <Plus size={16} className="mr-1" /> Add Another Requirement
            </Button>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="targetAudience" className="text-base flex items-center font-semibold">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-siso-orange"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Target Audience
            </Label>
            <Textarea
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="Describe who will be using your app (e.g., Small business owners, Students, Healthcare professionals)"
              className="bg-siso-bg/30 border-siso-border min-h-[80px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetLaunchDate" className="text-base flex items-center font-semibold">
              <Calendar size={18} className="mr-2 text-siso-orange" />
              Target Launch Date (Optional)
            </Label>
            <Input
              id="targetLaunchDate"
              name="targetLaunchDate"
              type="date"
              value={formData.targetLaunchDate}
              onChange={handleChange}
              className="bg-siso-bg/30 border-siso-border"
            />
          </div>
        </div>
        
        <div className="pt-4 flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="border-siso-border text-siso-text"
          >
            Back
          </Button>
          <Button 
            type="submit"
            className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
          >
            Continue to Features
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
