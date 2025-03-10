
export const importanceColors = {
  low: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  high: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
  critical: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
};

export const eventCardColors = {
  news: 'bg-blue-500',
  research: 'bg-purple-500',
  product: 'bg-green-500',
  business: 'bg-amber-500',
  opinion: 'bg-orange-500',
  development: 'bg-indigo-500',
  critical: 'text-red-800 bg-red-100',
  important: 'text-orange-800 bg-orange-100',
  moderate: 'text-blue-800 bg-blue-100',
  low: 'text-gray-800 bg-gray-100',
};

export const timeframeOptions = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
];

export const summaryTypes = [
  { value: 'executive', label: 'Executive' },
  { value: 'technical', label: 'Technical' },
  { value: 'comprehensive', label: 'Comprehensive' },
];
