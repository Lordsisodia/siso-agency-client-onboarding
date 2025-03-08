
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tab } from "./types";

interface TabContentProps {
  tab: Tab;
}

export const TabContent = ({ tab }: TabContentProps) => {
  return (
    <Card className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm hover:border-siso-orange/40 transition-all h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-siso-red/20 to-siso-orange/20 w-10 h-10 rounded-lg flex items-center justify-center">
          {tab.icon}
        </div>
        <h3 className="text-xl font-semibold text-siso-text-bold">{tab.label}</h3>
      </div>
      <p className="text-siso-text/70 mb-6">{tab.content.description}</p>
      <div className="aspect-video rounded-lg overflow-hidden mb-4 mt-auto">
        <img 
          src={tab.content.imageSrc} 
          alt={tab.content.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <Button className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90">
        {tab.content.buttonText}
      </Button>
    </Card>
  );
};
