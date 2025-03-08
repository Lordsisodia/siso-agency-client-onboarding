
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const portfolioItems = [
    {
      title: "Marketing Agency Dashboard",
      description: "Custom analytics dashboard that integrates with multiple ad platforms and provides real-time performance metrics.",
      image: "/lovable-uploads/5ec1265d-9c09-4681-939b-a60fd4d06152.png",
      tags: ["Web Application", "Analytics", "Marketing"],
      features: ["Real-time data visualization", "Multi-platform integration", "Automated reporting"]
    },
    {
      title: "Client Management System",
      description: "Comprehensive CRM solution for a creative agency to manage projects, clients, and communication in one place.",
      image: "/lovable-uploads/c9d84a03-c788-413c-8701-53881daf6476.png",
      tags: ["CRM", "Project Management", "Communication"],
      features: ["Client portal", "Project timeline tracking", "Integrated messaging"]
    },
    {
      title: "Resource Allocation Tool",
      description: "Team and resource management application that optimizes staff allocation across multiple client projects.",
      image: "/lovable-uploads/10c752e6-33e8-40f9-9076-a5689232e11a.png",
      tags: ["Team Management", "Resource Planning", "Optimization"],
      features: ["Drag-and-drop scheduling", "Capacity planning", "Skill matching"]
    },
    {
      title: "Content Creation Platform",
      description: "End-to-end content production platform with workflow management, approval processes, and publishing integrations.",
      image: "/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png",
      tags: ["Content Management", "Workflow", "Publishing"],
      features: ["Editorial calendar", "Version control", "Multi-channel publishing"]
    }
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
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Our Portfolio
            </h1>
            <p className="mt-4 text-lg text-siso-text/80 max-w-2xl mx-auto">
              Explore our collection of custom applications built for agencies across different industries.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl overflow-hidden border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm hover:border-siso-orange/40 transition-all cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex gap-2 mb-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-siso-orange/20 text-siso-orange">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-siso-text/80 mb-4">{item.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-siso-text-bold mb-2">Key Features:</h4>
                    <ul className="ml-5 list-disc text-sm text-siso-text/70">
                      {item.features.map(feature => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="flex items-center text-siso-orange hover:text-siso-red transition-colors">
                    View Case Study <ExternalLink className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 p-8 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm text-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Ready to Build Your Custom App?</h3>
            <p className="text-siso-text/80 mb-6 max-w-2xl mx-auto">
              Our team specializes in creating tailor-made applications that solve your specific business challenges. Let's discuss your project!
            </p>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white font-medium transition-all">
              Start Your Project
            </button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
