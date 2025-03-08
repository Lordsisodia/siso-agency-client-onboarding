
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { FileText, Package, Code, Server, Cpu, Zap } from 'lucide-react';

export default function PlanBuilder() {
  const stages = [
    { icon: FileText, title: "Requirements", description: "Define your app requirements and objectives" },
    { icon: Package, title: "Features", description: "Select the features and functionality you need" },
    { icon: Code, title: "Interface", description: "Choose your preferred UI/UX approach" },
    { icon: Server, title: "Backend", description: "Configure your app's server and database needs" },
    { icon: Cpu, title: "Integrations", description: "Select third-party services and APIs" },
    { icon: Zap, title: "Maintenance", description: "Define ongoing support and maintenance needs" }
  ];

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
              Plan Builder
            </h1>
            <p className="mt-4 text-lg text-siso-text/80 max-w-2xl mx-auto">
              Create detailed specifications for your custom app. Our interactive builder helps you define requirements and generate accurate estimates.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {stages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm hover:border-siso-orange/40 transition-all cursor-pointer"
              >
                <div className="bg-gradient-to-br from-siso-red/20 to-siso-orange/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <stage.icon className="text-siso-orange w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-siso-text-bold">{stage.title}</h3>
                <p className="text-siso-text/70">{stage.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-8 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm text-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Ready to Start Building Your Plan?</h3>
            <p className="text-siso-text/70 mb-6 max-w-2xl mx-auto">
              Click the button below to begin the interactive planning process. You can save your progress and return at any time.
            </p>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white font-medium transition-all">
              Start Building Your Plan
            </button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
