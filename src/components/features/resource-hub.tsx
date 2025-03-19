import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export interface ResourceTabItem {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
  };
}
export interface ResourceHubProps {
  tabs: ResourceTabItem[];
}
export const ResourceHub: React.FC<ResourceHubProps> = ({
  tabs
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  return <Card className="overflow-hidden border-0 shadow-lg">
      <CardContent className="p-0">
        <Tabs defaultValue={tabs[0].value} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row">
            
            
            
          </div>
        </Tabs>
      </CardContent>
    </Card>;
};