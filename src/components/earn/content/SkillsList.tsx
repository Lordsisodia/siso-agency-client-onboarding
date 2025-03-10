
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const SkillsList = ({ skills, userId }) => {
  const markSkillCompleted = async (skillId, skillName) => {
    try {
      // Check if user has already completed this skill
      const { data: existingProgress } = await supabase
        .from('user_skill_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('skill_id', skillId)
        .single();

      const now = new Date().toISOString();
      
      if (existingProgress) {
        // Update existing record
        const { error } = await supabase
          .from('user_skill_progress')
          .update({
            progress: 100,
            last_completed_at: now,
            times_completed: (existingProgress.times_completed || 0) + 1
          })
          .eq('id', existingProgress.id);
          
        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('user_skill_progress')
          .insert({
            user_id: userId,
            skill_id: skillId,
            skill_name: skillName, // Add the skill name to fix TS error
            completed_at: now,
            last_completed_at: now,
            times_completed: 1,
            progress: 100
          });
          
        if (error) throw error;
      }
      
      // Show success toast
      toast.success(`${skillName} marked as completed!`);
      
    } catch (error) {
      console.error('Error updating skill progress:', error);
      toast.error('Failed to update skill progress');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Available Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{skill.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    {skill.category}
                  </span>
                  {skill.points && (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                      {skill.points} points
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => markSkillCompleted(skill.id, skill.name)}
                className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
