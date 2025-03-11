
import { Helmet } from 'react-helmet';
import { Sidebar } from '@/components/Sidebar';

const DailyNews = () => {
  return (
    <div className="flex min-h-screen bg-siso-bg">
      <Helmet>
        <title>Daily News | SISO Platform</title>
        <meta name="description" content="Daily news feature coming soon." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20">
        <h1 className="text-2xl font-bold mb-6">Daily News</h1>
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-siso-border p-6">
          <p className="text-siso-text">This feature is currently unavailable.</p>
        </div>
      </main>
    </div>
  );
};

export default DailyNews;
