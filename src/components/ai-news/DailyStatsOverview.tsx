
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { SummaryContent } from './daily-summary/SummaryContent';
import { UseAiDailySummaryResult } from '@/types/daily-summary';

interface DailyStatsOverviewProps {
  date: Date;
  onDateChange: (date: Date) => void;
  summaryHook: UseAiDailySummaryResult;
}

export const DailyStatsOverview: React.FC<DailyStatsOverviewProps> = ({
  date,
  onDateChange,
  summaryHook
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data, loading } = summaryHook;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const goToPreviousDay = () => {
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    onDateChange(prevDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Don't allow selecting future days
    if (nextDay <= new Date()) {
      onDateChange(nextDay);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <Card>
        <CardHeader className="flex-row justify-between items-center space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">Daily AI News Summary</CardTitle>
            <CardDescription>
              Key developments and insights from {formatDate(date)}
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={goToPreviousDay}
              className="p-2 hover:bg-muted rounded-full"
              aria-label="Previous day"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            
            <div className="flex items-center gap-1 rounded-md border px-3 py-1">
              <Calendar className="h-4 w-4" />
              <span>{date.toLocaleDateString()}</span>
            </div>
            
            <button 
              onClick={goToNextDay}
              className="p-2 hover:bg-muted rounded-full"
              aria-label="Next day"
              disabled={new Date(date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Key Points</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="action">Action Items</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <SummaryContent 
                summaryData={data} 
                activeTab="summary" 
                setActiveTab={setActiveTab} 
              />
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <SummaryContent 
                summaryData={data} 
                activeTab="key_developments" 
                setActiveTab={setActiveTab} 
              />
            </TabsContent>
            <TabsContent value="impact" className="mt-4">
              <SummaryContent 
                summaryData={data} 
                activeTab="impact" 
                setActiveTab={setActiveTab} 
              />
            </TabsContent>
            <TabsContent value="action" className="mt-4">
              <SummaryContent 
                summaryData={data} 
                activeTab="action" 
                setActiveTab={setActiveTab} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
