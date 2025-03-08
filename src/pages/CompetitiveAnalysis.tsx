
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { TrendingUp, LineChart, BarChart3, PieChart, ArrowRight } from 'lucide-react';

export default function CompetitiveAnalysis() {
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
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Competitive Analysis
            </h1>
            <p className="mt-4 text-lg text-siso-text/80 max-w-2xl mx-auto">
              Understand the app development landscape and how your project compares to market standards and competitors.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm h-full">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-5 h-5 text-siso-orange mr-2" />
                  <h3 className="text-xl font-semibold text-siso-text-bold">Market Trends Analysis</h3>
                </div>
                <p className="text-siso-text/80 mb-6">
                  Our competitive analysis tool helps you understand how your app concept compares to existing solutions in the market. Enter your app details to get started.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">App Category</label>
                    <select 
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                    >
                      <option value="">Select category</option>
                      <option value="crm">CRM / Client Management</option>
                      <option value="project">Project Management</option>
                      <option value="analytics">Analytics / Reporting</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="content">Content Management</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-siso-text/70 mb-2">Target Users</label>
                    <select 
                      className="w-full p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none"
                    >
                      <option value="">Select user type</option>
                      <option value="agency">Agency Staff</option>
                      <option value="clients">Agency Clients</option>
                      <option value="both">Both Staff and Clients</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-siso-text/70 mb-2">Primary Features (Select up to 5)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['User Management', 'Analytics', 'File Sharing', 'Task Management', 'Client Portal', 'Invoicing', 'Reporting', 'Messaging', 'Calendar', 'Automation'].map(feature => (
                      <div key={feature} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={feature.toLowerCase().replace(' ', '-')} 
                          className="w-4 h-4 text-siso-orange rounded focus:ring-0 focus:ring-offset-0 border-siso-orange/30 bg-black/20"
                        />
                        <label 
                          htmlFor={feature.toLowerCase().replace(' ', '-')} 
                          className="ml-2 text-sm text-siso-text/80"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-siso-text/70 mb-2">Competitors (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    <input 
                      type="text"
                      className="flex-1 p-3 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text focus:border-siso-orange/50 focus:outline-none min-w-[200px]"
                      placeholder="Enter competitor website URL"
                    />
                    <button className="px-4 py-2 bg-siso-orange/20 text-siso-orange rounded-lg hover:bg-siso-orange/30 transition-colors">
                      Add
                    </button>
                  </div>
                </div>
                <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white font-medium transition-all">
                  Generate Analysis
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm h-full">
                <div className="flex items-center mb-4">
                  <LineChart className="w-5 h-5 text-siso-orange mr-2" />
                  <h3 className="text-xl font-semibold text-siso-text-bold">Why Analyze?</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="rounded-full bg-siso-orange/20 w-6 h-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <span className="text-siso-orange text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-siso-text-bold mb-1">Market Positioning</h4>
                      <p className="text-sm text-siso-text/70">Understand how your app idea fits into the current market landscape.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="rounded-full bg-siso-orange/20 w-6 h-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <span className="text-siso-orange text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-siso-text-bold mb-1">Feature Gap Analysis</h4>
                      <p className="text-sm text-siso-text/70">Identify opportunities to differentiate your app from competitors.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="rounded-full bg-siso-orange/20 w-6 h-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <span className="text-siso-orange text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-siso-text-bold mb-1">Cost Benchmarking</h4>
                      <p className="text-sm text-siso-text/70">Compare development costs against industry standards.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="rounded-full bg-siso-orange/20 w-6 h-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <span className="text-siso-orange text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-siso-text-bold mb-1">User Experience Insights</h4>
                      <p className="text-sm text-siso-text/70">Learn from successful UX patterns in similar applications.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <BarChart3 className="w-5 h-5 text-siso-orange mr-2" />
                <h3 className="text-xl font-semibold text-siso-text-bold">Feature Analysis</h3>
              </div>
              <p className="text-siso-text/80 mb-4">Compare your planned features against industry standards and top competitors.</p>
              <div className="h-40 flex items-center justify-center border border-dashed border-siso-orange/20 rounded-lg">
                <p className="text-siso-text/50 text-sm">Feature comparison chart will appear here</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <PieChart className="w-5 h-5 text-siso-orange mr-2" />
                <h3 className="text-xl font-semibold text-siso-text-bold">Market Share</h3>
              </div>
              <p className="text-siso-text/80 mb-4">Visualize the current market distribution and identify opportunities.</p>
              <div className="h-40 flex items-center justify-center border border-dashed border-siso-orange/20 rounded-lg">
                <p className="text-siso-text/50 text-sm">Market share visualization will appear here</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <LineChart className="w-5 h-5 text-siso-orange mr-2" />
                <h3 className="text-xl font-semibold text-siso-text-bold">Price Positioning</h3>
              </div>
              <p className="text-siso-text/80 mb-4">See how development and maintenance costs compare to market rates.</p>
              <div className="h-40 flex items-center justify-center border border-dashed border-siso-orange/20 rounded-lg">
                <p className="text-siso-text/50 text-sm">Price comparison chart will appear here</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Recent Analysis Reports</h3>
            <div className="space-y-4">
              {[
                "Project Management App Competitive Analysis",
                "CRM Solution Market Research",
                "Content Management System Feature Comparison"
              ].map((report, index) => (
                <div key={index} className="p-4 rounded-lg bg-black/20 border border-siso-orange/10 flex justify-between items-center">
                  <span className="text-siso-text/80">{report}</span>
                  <button className="text-siso-orange hover:text-siso-red transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
