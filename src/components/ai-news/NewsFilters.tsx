import { motion } from 'framer-motion';
import { Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { useState, useCallback } from 'react';
import NewsCategories from './NewsCategories';
import { debounce } from '@/lib/utils';
interface NewsFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDateChange?: (date: string | null) => void;
  selectedDate?: string | null;
}

// [Analysis] Animation variants for filter components to enhance UX
const itemVariants = {
  hidden: {
    opacity: 0,
    y: -10
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};
export const NewsFilters = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onDateChange,
  selectedDate
}: NewsFiltersProps) => {
  const [dateFilter, setDateFilter] = useState<string>(selectedDate || '');
  const [inputValue, setInputValue] = useState(searchQuery);

  // [Analysis] Use debounce to prevent too many search requests
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce((value: string) => {
    onSearchChange(value);
  }, 350), [onSearchChange]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };
  const handleDateSubmit = () => {
    if (onDateChange) {
      onDateChange(dateFilter || null);
    }
  };
  const clearDateFilter = () => {
    setDateFilter('');
    if (onDateChange) {
      onDateChange(null);
    }
  };
  return;
};
export default NewsFilters;