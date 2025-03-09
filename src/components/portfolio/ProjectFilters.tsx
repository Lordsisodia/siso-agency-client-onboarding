
import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface ProjectFiltersProps {
  onFilterChange: (filters: string[]) => void;
}

export function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // All available categories/tags
  const availableFilters = {
    projectType: [
      "Web Application", 
      "CRM", 
      "Analytics", 
      "E-commerce", 
      "Content Management"
    ],
    domain: [
      "Marketing", 
      "Project Management", 
      "Team Management", 
      "Resource Planning",
      "Operations",
      "Financial Management",
      "Communication",
      "Workflow",
      "Publishing",
      "Optimization"
    ]
  };

  useEffect(() => {
    onFilterChange(selected);
  }, [selected, onFilterChange]);

  const handleToggleFilter = (filter: string) => {
    setSelected(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleClearFilters = () => {
    setSelected([]);
  };

  return (
    <div className="relative">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={`flex items-center gap-2 border-siso-orange/30 ${selected.length > 0 ? 'bg-siso-orange/10' : 'bg-black/30'}`}
            size="sm"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {selected.length > 0 && (
              <Badge className="ml-1 bg-siso-orange text-white">{selected.length}</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 bg-black/95 border-siso-orange/30">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-siso-text-bold">Filters</h3>
              {selected.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearFilters}
                  className="text-xs text-siso-orange hover:text-siso-orange/80 hover:bg-transparent p-0 h-auto"
                >
                  Clear all
                </Button>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-siso-text-bold mb-2">Project Type</h4>
              <div className="space-y-2">
                {availableFilters.projectType.map(filter => (
                  <div key={filter} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`filter-${filter}`} 
                      checked={selected.includes(filter)} 
                      onCheckedChange={() => handleToggleFilter(filter)}
                      className="data-[state=checked]:bg-siso-orange data-[state=checked]:border-siso-orange"
                    />
                    <label 
                      htmlFor={`filter-${filter}`}
                      className="text-sm text-siso-text leading-none cursor-pointer"
                    >
                      {filter}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="bg-siso-border/20" />
            
            <div>
              <h4 className="text-sm font-medium text-siso-text-bold mb-2">Domain/Industry</h4>
              <div className="space-y-2">
                {availableFilters.domain.map(filter => (
                  <div key={filter} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`filter-${filter}`} 
                      checked={selected.includes(filter)} 
                      onCheckedChange={() => handleToggleFilter(filter)}
                      className="data-[state=checked]:bg-siso-orange data-[state=checked]:border-siso-orange"
                    />
                    <label 
                      htmlFor={`filter-${filter}`}
                      className="text-sm text-siso-text leading-none cursor-pointer"
                    >
                      {filter}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white"
                onClick={() => setPopoverOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map(filter => (
            <Badge 
              key={filter}
              variant="outline" 
              className="bg-siso-orange/10 text-siso-orange border-siso-orange/40 flex items-center gap-1 py-1 px-2"
            >
              {filter}
              <button 
                className="ml-1 text-siso-orange/70 hover:text-siso-orange"
                onClick={() => handleToggleFilter(filter)}
              >
                ×
              </button>
            </Badge>
          ))}
          <Button 
            variant="link" 
            className="text-xs text-siso-orange hover:text-siso-red p-0 h-5"
            onClick={handleClearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
