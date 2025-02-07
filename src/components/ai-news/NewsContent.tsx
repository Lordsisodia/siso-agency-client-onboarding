
import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const NewsCard = lazy(() => import('@/components/ai-news/NewsCard'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-6 w-6 animate-spin text-siso-red" />
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface NewsContentProps {
  newsItems: any[];
  searchQuery: string;
  summaries: Record<string, string>;
  loadingSummaries: Record<string, boolean>;
  onGenerateSummary: (id: string) => void;
}

export const NewsContent = ({
  newsItems,
  searchQuery,
  summaries,
  loadingSummaries,
  onGenerateSummary
}: NewsContentProps) => {
  const filteredNewsItems = newsItems.filter(item => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {filteredNewsItems.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {filteredNewsItems.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              summaries={summaries}
              loadingSummaries={loadingSummaries}
              onGenerateSummary={onGenerateSummary}
            />
          ))}
        </motion.div>
      )}
    </Suspense>
  );
};
