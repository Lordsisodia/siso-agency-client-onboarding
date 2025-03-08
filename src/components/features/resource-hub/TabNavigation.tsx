
import { Tab } from "./types";

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
            ${activeTab === tab.value 
              ? 'bg-gradient-to-r from-siso-red to-siso-orange text-white' 
              : 'bg-black/20 text-siso-text/70 hover:bg-black/30'
            }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
