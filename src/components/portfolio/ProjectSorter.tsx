
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SortOption } from './types';

interface ProjectSorterProps {
  onSortChange: (option: SortOption) => void;
  currentSort: SortOption;
}

export function ProjectSorter({ onSortChange, currentSort }: ProjectSorterProps) {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'A to Z' },
    { value: 'reverseAlphabetical', label: 'Z to A' },
  ];

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === currentSort)?.label || 'Sort';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 border-siso-orange/30 bg-black/30">
          <ArrowUpDown className="h-4 w-4" />
          <span>{getCurrentSortLabel()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/95 border-siso-orange/30">
        {sortOptions.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`cursor-pointer ${
              currentSort === option.value ? 'bg-siso-orange/10 text-siso-orange' : 'text-siso-text'
            }`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
