
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TaskProject } from '@/types/task';
import { format, addDays, differenceInDays } from 'date-fns';
import { phaseConfig } from '@/config/projectConfig';
import { CalendarIcon, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface ProjectTimelineViewProps {
  project: TaskProject;
}

export const ProjectTimelineView: React.FC<ProjectTimelineViewProps> = ({ project }) => {
  const [view, setView] = useState<'phases' | 'timeline'>('phases');
  
  // Generate timeline data based on project phases
  const generateTimelineData = () => {
    const startDate = new Date(project.deadline);
    startDate.setDate(startDate.getDate() - 90); // Assume 90 days project
    
    const timelineDates = [];
    let currentDate = new Date(startDate);
    
    // Calculate total duration
    const phaseDurations = project.phases.map((phase, index) => {
      const duration = index === project.phases.length - 1 
        ? 20 // Last phase fixed duration
        : 15 + (index * 5); // Gradually increasing durations
      return { ...phase, duration };
    });
    
    // Generate dates
    for (const phase of phaseDurations) {
      const phaseStartDate = new Date(currentDate);
      const phaseEndDate = addDays(currentDate, phase.duration);
      
      timelineDates.push({
        ...phase,
        startDate: phaseStartDate,
        endDate: phaseEndDate,
        current: new Date() >= phaseStartDate && new Date() <= phaseEndDate
      });
      
      currentDate = addDays(phaseEndDate, 1);
    }
    
    return timelineDates;
  };
  
  const timelineData = generateTimelineData();
  
  // Calculate overall progress
  const overallProgress = Math.round(
    project.phases.reduce((acc, phase) => acc + phase.progress, 0) / project.phases.length
  );
  
  // Days to deadline
  const daysToDeadline = differenceInDays(new Date(project.deadline), new Date());
  const deadlineStatus = daysToDeadline < 0 ? 'overdue' : daysToDeadline <= 7 ? 'soon' : 'ok';
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Project Timeline</CardTitle>
            <Tabs value={view} onValueChange={(v) => setView(v as 'phases' | 'timeline')} className="w-auto">
              <TabsList className="grid grid-cols-2 w-[200px]">
                <TabsTrigger value="phases">Phases</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm">{overallProgress}% Complete</span>
            </div>
            <Progress value={overallProgress} className="h-2" 
              indicatorClassName={`${overallProgress > 75 ? 'bg-green-500' : overallProgress > 30 ? 'bg-blue-500' : 'bg-amber-500'}`} 
            />
            
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Start date: {format(timelineData[0].startDate, 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className={`h-4 w-4 ${
                  deadlineStatus === 'overdue' ? 'text-red-500' :
                  deadlineStatus === 'soon' ? 'text-amber-500' :
                  'text-green-500'
                }`} />
                <span className={
                  deadlineStatus === 'overdue' ? 'text-red-500' :
                  deadlineStatus === 'soon' ? 'text-amber-500' :
                  'text-green-500'
                }>
                  {deadlineStatus === 'overdue' 
                    ? `Overdue by ${Math.abs(daysToDeadline)} days` 
                    : `${daysToDeadline} days remaining`}
                </span>
              </div>
            </div>
          </div>
          
          {view === 'phases' ? (
            <div className="space-y-6">
              {project.phases.map((phase, index) => {
                const phaseData = Object.entries(phaseConfig).find(([_, config]) => 
                  config.title.toLowerCase().includes(phase.name.toLowerCase())
                );
                
                const phaseInfo = phaseData ? phaseData[1] : {
                  icon: <CheckCircle className="w-4 h-4" />,
                  color: 'bg-slate-500 text-white',
                  title: phase.name,
                  description: 'Project phase'
                };
                
                return (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${phaseInfo.color}`}>
                        {phaseInfo.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{phase.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {timelineData[index]
                            ? `${format(timelineData[index].startDate, 'MMM d')} - ${format(timelineData[index].endDate, 'MMM d, yyyy')}`
                            : 'Date range unavailable'}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          phase.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                          phase.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {phase.status === 'completed' ? 'Completed' :
                           phase.status === 'in-progress' ? 'In Progress' :
                           'Pending'}
                        </span>
                        <span className="text-sm font-medium">{phase.progress}%</span>
                      </div>
                    </div>
                    <div className="mt-3 ml-5 pl-5 border-l-2 border-dashed border-slate-200">
                      <div className="py-2">
                        <Progress value={phase.progress} className="h-1.5" 
                          indicatorClassName={`${
                            phase.status === 'completed' ? 'bg-green-500' : 
                            phase.status === 'in-progress' ? 'bg-blue-500' : 
                            'bg-gray-300'
                          }`} 
                        />
                      </div>
                      
                      {index < project.phases.length - 1 && <div className="h-4"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="relative pt-2">
              <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-slate-200"></div>
              
              {timelineData.map((phase, index) => (
                <div key={index} className="mb-8 relative">
                  <div className={`absolute left-0 top-2 w-3 h-3 rounded-full transform -translate-x-1.5 border-2 ${
                    phase.current ? 'bg-blue-500 border-blue-200' :
                    phase.status === 'completed' ? 'bg-green-500 border-green-200' :
                    'bg-slate-300 border-slate-200'
                  }`}></div>
                  
                  <div className="ml-6">
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium">{phase.name}</h3>
                      {phase.current && (
                        <span className="ml-2 text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">
                          Current Phase
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {format(phase.startDate, 'MMM d')} - {format(phase.endDate, 'MMM d, yyyy')}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={phase.progress} className="h-1.5 flex-grow" 
                        indicatorClassName={`${
                          phase.status === 'completed' ? 'bg-green-500' : 
                          phase.status === 'in-progress' ? 'bg-blue-500' : 
                          'bg-gray-300'
                        }`} 
                      />
                      <span className="text-xs font-medium">{phase.progress}%</span>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                      {phase.status === 'completed' && (
                        <div className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" /> Completed
                        </div>
                      )}
                      
                      {phase.status === 'in-progress' && (
                        <div className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> In Progress
                        </div>
                      )}
                      
                      {phase.status === 'pending' && (
                        <div className="text-xs bg-slate-500/10 text-slate-500 px-2 py-0.5 rounded flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-1" /> Not Started
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
