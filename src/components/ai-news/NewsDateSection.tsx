
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedNewsItem } from '@/types/news-item';
import { EnhancedNewsCard } from './EnhancedNewsCard';
import { ArticleImpact } from '@/types/complexity';

interface NewsDateSectionProps {
  date: string;
  articles: EnhancedNewsItem[];
  featuredArticleId?: string;
}

export const NewsDateSection: React.FC<NewsDateSectionProps> = ({
  date,
  articles,
  featuredArticleId,
}) => {
  const [expandedDate, setExpandedDate] = useState(true);

  // Don't show if no articles for this date or all are featured and we're hiding those
  if (articles.length === 0) {
    return null;
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group articles by impact (high, medium, low)
  const getGroupedArticles = () => {
    const grouped: Record<string, EnhancedNewsItem[]> = {
      high: [],
      medium: [],
      low: [],
    };

    articles.forEach((article) => {
      // Skip featured articles if they'll be shown separately
      if (article.id === featuredArticleId) return;

      const impact = article.impact || ArticleImpact.Medium;
      
      // Handle both string and enum types
      const impactKey = typeof impact === 'string' ? impact : impact.toString();
      
      // Default to medium if not in the expected list
      if (['high', 'medium', 'low'].includes(impactKey)) {
        grouped[impactKey].push(article);
      } else {
        grouped.medium.push(article);
      }
    });

    return grouped;
  };

  const groupedArticles = getGroupedArticles();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-10"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatDate(date)}
        </h2>
        <button
          onClick={() => setExpandedDate(!expandedDate)}
          className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          {expandedDate ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {expandedDate && (
        <div className="space-y-8">
          {/* High impact articles */}
          {groupedArticles.high.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400 border-l-4 border-red-500 pl-3">
                High Impact
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedArticles.high.map((article) => (
                  <EnhancedNewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}

          {/* Medium impact articles */}
          {groupedArticles.medium.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500 pl-3">
                Medium Impact
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedArticles.medium.map((article) => (
                  <EnhancedNewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}

          {/* Low impact articles */}
          {groupedArticles.low.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-400 border-l-4 border-green-500 pl-3">
                Low Impact
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedArticles.low.map((article) => (
                  <EnhancedNewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
