
import React from 'react';
import { Trophy, Star, Medal, Award, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProfileCard } from './ProfileCard';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

interface AchievementsSectionProps {
  achievements?: Achievement[];
  pointsTotal: number;
  pointsNextLevel: number;
  rank: string;
  recentActivities?: {
    action: string;
    points: number;
    date: string;
  }[];
}

export const AchievementsSection = ({ 
  achievements = [], 
  pointsTotal, 
  pointsNextLevel, 
  rank, 
  recentActivities = [] 
}: AchievementsSectionProps) => {
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((pointsTotal / pointsNextLevel) * 100));
  
  return (
    <ProfileCard icon={Trophy} title="Achievements & Progress" isEditing={false}>
      <div className="space-y-6">
        {/* Points Progress */}
        <div className="bg-siso-text/5 p-4 rounded-lg border border-siso-text/10">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-siso-orange" />
              <h3 className="font-medium text-siso-text-bold">Points Progress</h3>
            </div>
            <Badge 
              variant="gradient"
              className="text-xs"
              glow
              animated
            >
              {rank}
            </Badge>
          </div>
          
          <div className="mb-2">
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-siso-text/10" 
              indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange"
            />
          </div>
          
          <div className="flex justify-between text-sm text-siso-text/70">
            <span>{pointsTotal} points</span>
            <span>{pointsNextLevel - pointsTotal} points to next level</span>
          </div>
        </div>
        
        {/* Earned Achievements */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Medal className="h-5 w-5 text-siso-orange" />
            <h3 className="font-medium text-siso-text-bold">Earned Rewards</h3>
          </div>
          
          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-siso-text/5 p-3 rounded-lg border border-siso-text/10 flex items-start gap-3"
                >
                  <div className="mt-0.5">
                    <Award className="h-5 w-5 text-siso-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-siso-text-bold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-siso-text/70 mt-1">{achievement.description}</p>
                    <p className="text-xs text-siso-text/50 mt-1">{achievement.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-siso-text/5 p-4 rounded-lg border border-siso-text/10 text-center">
              <p className="text-sm text-siso-text/70">Complete tasks to earn your first achievement!</p>
            </div>
          )}
        </div>
        
        {/* Recent Activities */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-siso-orange" />
            <h3 className="font-medium text-siso-text-bold">Recent Activities</h3>
          </div>
          
          {recentActivities.length > 0 ? (
            <div className="space-y-2">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-siso-text/5 p-3 rounded-lg border border-siso-text/10 flex justify-between items-center"
                >
                  <div className="text-sm text-siso-text-bold">{activity.action}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-siso-text/70">{activity.date}</span>
                    <Badge variant="success" className="text-xs">+{activity.points} pts</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-siso-text/5 p-4 rounded-lg border border-siso-text/10 text-center">
              <p className="text-sm text-siso-text/70">No recent activities yet.</p>
            </div>
          )}
        </div>
      </div>
    </ProfileCard>
  );
};
