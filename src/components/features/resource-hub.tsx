
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

export const ResourceHub: React.FC<ResourceHubProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardContent className="p-0">
        <Tabs defaultValue={tabs[0].value} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-muted/30 p-1 md:p-2">
              <TabsList className="flex flex-row md:flex-col w-full h-auto bg-transparent space-y-0 md:space-y-1 space-x-1 md:space-x-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`flex items-center justify-start px-3 py-2 w-auto md:w-full text-left ${
                      activeTab === tab.value
                        ? "bg-white data-[state=active]:bg-white shadow-sm"
                        : "hover:bg-muted/50 transition-colors"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    <span className="hidden md:inline-block">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="w-full md:w-2/3 p-4 md:p-6">
              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-0 space-y-4">
                  <div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-0 mb-2">
                      {tab.content.badge}
                    </Badge>
                    <h3 className="text-xl md:text-2xl font-bold">{tab.content.title}</h3>
                    <p className="text-muted-foreground mt-2">{tab.content.description}</p>
                    
                    <Button className="mt-4">{tab.content.buttonText}</Button>
                  </div>
                  
                  <div className="mt-6">
                    <img
                      src={tab.content.imageSrc}
                      alt={tab.content.imageAlt}
                      className="rounded-lg shadow-md border border-muted w-full h-auto object-cover"
                      style={{ maxHeight: "280px" }}
                    />
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
