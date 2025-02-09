
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { VideoAnalysis as VideoAnalysisType } from './types/analysis';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

// Import tab components
import { OverviewTab } from './video-analysis/tabs/OverviewTab';
import { TimelineTab } from './video-analysis/tabs/TimelineTab';
import { TechnicalTab } from './video-analysis/tabs/TechnicalTab';
import { LearningTab } from './video-analysis/tabs/LearningTab';
import { ResourcesTab } from './video-analysis/tabs/ResourcesTab';
import { PracticeTab } from './video-analysis/tabs/PracticeTab';
import { CommunityTab } from './video-analysis/tabs/CommunityTab';
import { VisualTab } from './video-analysis/tabs/VisualTab';
import { BusinessTab } from './video-analysis/tabs/BusinessTab';

interface VideoAnalysisProps {
  videoId: string;
}

export function VideoAnalysis({ videoId }: VideoAnalysisProps) {
  const [selectedTimestamp, setSelectedTimestamp] = useState<string | null>(null);

  const { data: analysis, isLoading } = useQuery({
    queryKey: ['video-analysis', videoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_analysis')
        .select('*')
        .eq('video_id', videoId)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;

      // Type assertion and validation for JSON fields
      const transformedData: VideoAnalysisType = {
        id: data.id,
        video_id: data.video_id,
        chapters: (data.chapters || []) as VideoAnalysisType['chapters'],
        complexity_score: data.complexity_score || 0,
        prerequisites: (data.prerequisites || []) as string[],
        technologies_mentioned: (data.technologies_mentioned || []) as string[],
        code_segments: (data.code_segments || []) as VideoAnalysisType['code_segments'],
        key_concepts: (data.key_concepts || []) as string[],
        learning_outcomes: (data.learning_outcomes || []) as string[],
        estimated_completion_time: data.estimated_completion_time || 0,
        difficulty_level: data.difficulty_level as 'Beginner' | 'Intermediate' | 'Advanced' || 'Intermediate',
        external_resources: (data.external_resources || []) as VideoAnalysisType['external_resources'],
        sentiment_analysis: data.sentiment_analysis as VideoAnalysisType['sentiment_analysis'] || {
          overall_score: 0,
          key_sentiments: [],
          engagement_prediction: 0
        },
        visual_aids: (data.visual_aids || []) as VideoAnalysisType['visual_aids'],
        content_timeline: (data.content_timeline || []) as VideoAnalysisType['content_timeline'],
        code_quality_metrics: data.code_quality_metrics as VideoAnalysisType['code_quality_metrics'] || {
          overall_score: 0,
          maintainability: 0,
          reusability: 0,
          best_practices: [],
          improvement_suggestions: []
        },
        learning_path: data.learning_path as VideoAnalysisType['learning_path'] || {
          prerequisites: [],
          next_steps: [],
          skill_tree: []
        },
        practice_exercises: (data.practice_exercises || []) as VideoAnalysisType['practice_exercises'],
        community_insights: (data.community_insights || []) as VideoAnalysisType['community_insights'],
        supplementary_materials: (data.supplementary_materials || []) as VideoAnalysisType['supplementary_materials'],
        business_metrics: data.business_metrics as VideoAnalysisType['business_metrics'] || {
          implementation_costs: {
            small_team: null,
            medium_team: null,
            enterprise: null
          },
          roi_metrics: {
            time_savings: null,
            cost_savings: null,
            productivity_gain: null
          },
          resource_requirements: {
            team_size: null,
            skill_levels: [],
            tools_needed: []
          },
          industry_insights: {
            market_trends: [],
            competitor_analysis: [],
            best_practices: []
          }
        },
        client_resources: data.client_resources as VideoAnalysisType['client_resources'] || {
          presentation_templates: [],
          implementation_guides: [],
          cost_calculators: [],
          timeline_templates: [],
          success_metrics: []
        },
        team_collaboration: data.team_collaboration as VideoAnalysisType['team_collaboration'] || {
          annotations: [],
          assigned_tasks: [],
          skill_requirements: [],
          knowledge_gaps: []
        }
      };

      return transformedData;
    },
  });

  const handleTimeClick = (timestamp: string) => {
    setSelectedTimestamp(timestamp);
    console.log('Jumping to timestamp:', timestamp);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Card className="p-6">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="grid grid-cols-1 gap-6 p-6">
        <Card className="p-6">
          <p className="text-gray-500">AI analysis will be available for this video soon.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab analysis={analysis} />
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <TimelineTab 
            analysis={analysis}
            selectedTimestamp={selectedTimestamp}
            onTimeClick={handleTimeClick}
          />
        </TabsContent>

        <TabsContent value="technical" className="mt-6">
          <TechnicalTab analysis={analysis} onTimeClick={handleTimeClick} />
        </TabsContent>

        <TabsContent value="learning" className="mt-6">
          <LearningTab analysis={analysis} />
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <BusinessTab analysis={analysis} />
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <ResourcesTab analysis={analysis} />
        </TabsContent>

        <TabsContent value="practice" className="mt-6">
          <PracticeTab analysis={analysis} />
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <CommunityTab analysis={analysis} onTimeClick={handleTimeClick} />
        </TabsContent>

        <TabsContent value="visual" className="mt-6">
          <VisualTab analysis={analysis} onTimeClick={handleTimeClick} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
