
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Educator } from '@/hooks/education/use-educators-list';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Video } from 'lucide-react';

interface EducatorCardProps {
  educator: Educator;
}

export const EducatorCard: React.FC<EducatorCardProps> = ({ educator }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 hover:border-siso-orange/50 transition-all cursor-pointer"
      onClick={() => navigate(`/educator/${educator.slug}`)}
    >
      <div className="h-20 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
      
      <div className="flex justify-center -mt-10">
        <div className="h-20 w-20 rounded-full border-4 border-gray-800 bg-gray-700 flex items-center justify-center overflow-hidden">
          {educator.channel_avatar_url ? (
            <img 
              src={educator.channel_avatar_url} 
              alt={educator.name}
              className="h-full w-full object-cover" 
            />
          ) : (
            <span className="text-2xl font-bold text-white">
              {educator.name?.charAt(0)}
            </span>
          )}
        </div>
      </div>
      
      <CardContent className="pt-2 text-center">
        <h3 className="text-xl font-bold text-white truncate">{educator.name}</h3>
        
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {educator.specialization?.slice(0, 3).map((topic, index) => (
            <Badge key={index} className="bg-gray-700 hover:bg-gray-600 text-gray-200">
              {topic}
            </Badge>
          ))}
        </div>
        
        <p className="text-gray-400 mt-3 text-sm line-clamp-2 h-10">
          {educator.description || 'Educational content creator'}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-gray-700 bg-gray-800/50 p-4">
        <div className="flex items-center text-gray-400 text-sm">
          <Video className="h-4 w-4 mr-1" />
          <span>{educator.videos_count || 0} videos</span>
        </div>
        
        <div className="flex items-center text-gray-400 text-sm">
          <Users className="h-4 w-4 mr-1" />
          <span>{educator.number_of_subscribers ? 
            (educator.number_of_subscribers > 1000000 
              ? `${(educator.number_of_subscribers / 1000000).toFixed(1)}M` 
              : educator.number_of_subscribers > 1000 
                ? `${(educator.number_of_subscribers / 1000).toFixed(1)}K`
                : educator.number_of_subscribers)
            : 'N/A'} subscribers</span>
        </div>
      </CardFooter>
    </Card>
  );
};
