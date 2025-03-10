
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, CheckCircle, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePoints } from '@/hooks/usePoints';
import { useAuthSession } from '@/hooks/useAuthSession';

interface Skill {
  id: string;
  skill_id: string;
  name: string;
  description: string;
  icon?: string;
  category: string;
  xp_value: number;
  completed?: boolean;
  locked?: boolean;
}

interface SkillsListProps {
  skills: Skill[];
  userProgress?: Record<string, any>;
}

export const SkillsList: React.FC<SkillsListProps> = ({ skills, userProgress }) => {
  const { toast } = useToast();
  const { user } = useAuthSession();
  const { awardPoints } = usePoints(user?.id);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const toggleExpand = (skillId: string) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  const handleComplete = async (skill: Skill) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to track skill progress.",
        variant: "destructive",
      });
      return;
    }

    try {
      const now = new Date().toISOString();
      
      // Check if this skill has been completed before
      const { data: existingProgress } = await supabase
        .from('user_skill_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('skill_id', skill.skill_id)
        .single();
      
      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('user_skill_progress')
          .update({
            progress: 100,
            completed_at: now,
            last_completed_at: now,
            times_completed: (existingProgress.times_completed || 0) + 1
          })
          .eq('id', existingProgress.id);
          
        if (error) throw error;
      } else {
        // Create new progress entry
        const { error } = await supabase
          .from('user_skill_progress')
          .insert({
            user_id: user.id,
            skill_id: skill.skill_id,
            skill_name: skill.name,  // Add the required skill_name field
            progress: 100,
            completed_at: now,
            last_completed_at: now,
            times_completed: 1
          });
          
        if (error) throw error;
      }
      
      // Award points for completing a skill
      awardPoints('complete_task');
      
      toast({
        title: "Skill completed!",
        description: `You've completed "${skill.name}" and earned XP.`,
      });
    } catch (error: any) {
      console.error("Error completing skill:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update skill progress.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {skills.map((skill) => {
        const isCompleted = userProgress?.[skill.skill_id]?.completed_at;
        const timesCompleted = userProgress?.[skill.skill_id]?.times_completed || 0;
        
        return (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`border rounded-lg overflow-hidden ${isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}
          >
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleExpand(skill.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-md ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                  {isCompleted ? 
                    <CheckCircle className="h-5 w-5" /> : 
                    (skill.locked ? <Lock className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />)}
                </div>
                <div>
                  <h3 className="font-medium flex items-center">
                    {skill.name}
                    {timesCompleted > 1 && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-green-100 text-green-800">
                        x{timesCompleted}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">{skill.xp_value} XP</span>
                <svg
                  className={`w-5 h-5 transition-transform ${expandedSkill === skill.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {expandedSkill === skill.id && (
              <div className="px-4 pb-4 pt-1 border-t">
                <p className="text-sm mb-4">{skill.description}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleComplete(skill)}
                    disabled={skill.locked}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : skill.locked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {isCompleted ? 'Completed' : skill.locked ? 'Locked' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
