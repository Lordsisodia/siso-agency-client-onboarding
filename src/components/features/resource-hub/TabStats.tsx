
import { CardStats } from "./types";

interface TabStatsProps {
  stats: CardStats[];
}

export const TabStats = ({ stats }: TabStatsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-black/20 p-4 rounded-xl border border-siso-orange/10 text-center"
        >
          <p className="text-xl md:text-2xl font-bold text-siso-text-bold mb-1">{stat.value}</p>
          <p className="text-xs text-siso-text/60">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
