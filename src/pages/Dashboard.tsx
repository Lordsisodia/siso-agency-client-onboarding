
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        
        <div className="relative z-10 container px-4 py-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Dashboard
            </h1>
            <p className="mt-4 text-lg text-siso-text/80">
              Your central hub for all project activities and quick insights.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Active Projects</h3>
              <p className="text-siso-text/70">You don't have any active projects yet. Start by creating a new project.</p>
            </div>
            
            <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Recent Activities</h3>
              <p className="text-siso-text/70">No recent activities to display. Your project updates will appear here.</p>
            </div>
            
            <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/projects" className="text-siso-orange hover:text-siso-red transition-colors">Create New Project</a>
                </li>
                <li>
                  <a href="/plan-builder" className="text-siso-orange hover:text-siso-red transition-colors">Start Plan Builder</a>
                </li>
                <li>
                  <a href="/company-profile" className="text-siso-orange hover:text-siso-red transition-colors">Update Company Profile</a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
