
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SkillsListProps {
  skills: any[];
  userId: string;
}

export const SkillsList = ({ skills, userId }: SkillsListProps) => {
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('user_skill_progress')
          .select('*')
          .eq('user_id', userId);

        if (error) throw error;
        setUserProgress(data || []);
      } catch (error) {
        console.error('Error fetching user skill progress:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your skill progress.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProgress();
    }
  }, [userId, toast]);

  const handleCompleteSkill = async (skill: any) => {
    // Check if the user has progress for this skill
    const existingProgress = userProgress.find(p => p.skill_id === skill.skill_id);
    const now = new Date().toISOString();

    try {
      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('user_skill_progress')
          .update({
            progress: 100,
            level: existingProgress.level + 1,
            completed_at: now,
            last_completed_at: now,
            times_completed: existingProgress.times_completed + 1
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        // Create new progress
        const { error } = await supabase
          .from('user_skill_progress')
          .insert({
            user_id: userId,
            skill_id: skill.skill_id,
            skill_name: skill.name, // Add the required skill_name property
            progress: 100,
            level: 1,
            completed_at: now,
            last_completed_at: now,
            times_completed: 1
          });

        if (error) throw error;
      }

      // Update local state
      toast({
        title: 'Skill Completed!',
        description: `You've completed ${skill.name}`,
      });

      // Refetch progress
      const { data, error } = await supabase
        .from('user_skill_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      setUserProgress(data || []);
    } catch (error) {
      console.error('Error updating skill progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to update skill progress.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div>Loading skills...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => {
        const progress = userProgress.find(p => p.skill_id === skill.skill_id);
        return (
          <div key={skill.skill_id} className="bg-card border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{skill.name}</h3>
              {progress && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  Level {progress.level}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
            
            <div className="mt-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${progress ? progress.progress : 0}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-right text-muted-foreground">
                {progress ? progress.progress : 0}% complete
              </div>
            </div>
            
            <button
              onClick={() => handleCompleteSkill(skill)}
              className="mt-3 w-full text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition"
            >
              {progress ? 'Level Up' : 'Start Learning'}
            </button>
          </div>
        );
      })}
    </div>
  );
};
