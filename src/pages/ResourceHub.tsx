
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { FileText, BookOpen, Lightbulb, Briefcase, BarChart, Code } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ResourceHub() {
  const tabs = [
    {
      value: "guides",
      icon: <FileText className="h-4 w-4" />,
      label: "Guides",
      content: {
        badge: "Development Guides",
        title: "App Development Best Practices",
        description: "Learn industry-standard development practices and methodologies to create robust, maintainable applications.",
        buttonText: "View Guides",
        imageSrc: "/lovable-uploads/90c0de54-b6ba-4500-8bac-ec508dd51cf8.png",
        imageAlt: "App Development Guides"
      }
    },
    {
      value: "resources",
      icon: <BookOpen className="h-4 w-4" />,
      label: "Resources",
      content: {
        badge: "Educational Resources",
        title: "Technical Documentation & Tools",
        description: "Access comprehensive documentation, tutorials, and technical resources to enhance your app development knowledge.",
        buttonText: "Explore Resources",
        imageSrc: "/lovable-uploads/5ba92f91-0e4b-4f5d-9ed2-ae6e93c895a4.png",
        imageAlt: "Technical Documentation"
      }
    },
    {
      value: "insights",
      icon: <Lightbulb className="h-4 w-4" />,
      label: "Insights",
      content: {
        badge: "Industry Insights",
        title: "App Development Trends & Analysis",
        description: "Stay informed about the latest trends, technologies, and best practices in the app development industry.",
        buttonText: "Read Insights",
        imageSrc: "/lovable-uploads/8e5ff417-0826-4bc1-8afb-09cc8b6912c4.png",
        imageAlt: "Industry Insights"
      }
    },
    {
      value: "case-studies",
      icon: <Briefcase className="h-4 w-4" />,
      label: "Case Studies",
      content: {
        badge: "Success Stories",
        title: "Real-World App Development Solutions",
        description: "Explore our collection of case studies showcasing successful app development projects across various industries.",
        buttonText: "View Case Studies",
        imageSrc: "/lovable-uploads/2abbfd96-461a-4ccc-87d0-1ec32698671f.png",
        imageAlt: "Case Studies"
      }
    },
    {
      value: "statistics",
      icon: <BarChart className="h-4 w-4" />,
      label: "Statistics",
      content: {
        badge: "Industry Metrics",
        title: "App Development Statistics & Analytics",
        description: "Access valuable statistics and analytics about app development costs, timelines, and performance metrics.",
        buttonText: "View Statistics",
        imageSrc: "/lovable-uploads/c7ac43fd-bc3e-478d-8b4f-809beafb6838.png",
        imageAlt: "Development Statistics"
      }
    },
    {
      value: "code-examples",
      icon: <Code className="h-4 w-4" />,
      label: "Code Examples",
      content: {
        badge: "Developer Resources",
        title: "Ready-to-Use Code Samples & Templates",
        description: "Access a library of code examples, templates, and snippets to accelerate your app development process.",
        buttonText: "Explore Code",
        imageSrc: "/lovable-uploads/11a3454b-9de6-49c7-83b3-80f258d0ff53.png",
        imageAlt: "Code Examples"
      }
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
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 pt-16 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text mb-4">
              Resource Hub
            </h1>
            <p className="text-lg text-siso-text/80 max-w-2xl mx-auto">
              Access our comprehensive collection of guides, resources, and insights to support your app development journey.
            </p>
          </motion.div>
          
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tabs.map((tab) => (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm hover:border-siso-orange/40 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-siso-red/20 to-siso-orange/20 w-10 h-10 rounded-lg flex items-center justify-center">
                      {tab.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-siso-text-bold">{tab.label}</h3>
                  </div>
                  <p className="text-siso-text/70 mb-6">{tab.content.description}</p>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img 
                      src={tab.content.imageSrc} 
                      alt={tab.content.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90">
                    {tab.content.buttonText}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
