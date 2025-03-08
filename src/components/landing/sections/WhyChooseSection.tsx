
import { GradientHeading } from '@/components/ui/gradient-heading';
import { Bot, Users, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// Adding default export to fix import issues
const WhyChooseSection = () => {
  const features = [
    {
      icon: Bot,
      title: "Intelligent Coding Assistant",
      description: "Experience seamless development with our AI that understands your code, suggests optimizations, and helps solve complex programming challenges in real-time.",
      stats: "98% accuracy rate",
      highlight: "Contextual understanding"
    },
    {
      icon: Users,
      title: "Vibrant Developer Community",
      description: "Connect with thousands of developers worldwide. Share code snippets, discuss best practices, and collaborate on innovative solutions to common problems.",
      stats: "10,000+ active members",
      highlight: "Peer-to-peer learning"
    },
    {
      icon: Zap,
      title: "Rapid Prototyping Tools",
      description: "Transform ideas into working prototypes in minutes with our advanced AI-powered tools that generate clean, production-ready code from simple prompts.",
      stats: "60% faster development",
      highlight: "Customizable templates"
    },
    {
      icon: Globe,
      title: "Enterprise-grade Solutions",
      description: "Build scalable applications with our comprehensive toolkit that includes performance monitoring, security scanning, and automated deployment pipelines.",
      stats: "99.9% uptime guarantee",
      highlight: "End-to-end support"
    }
  ];

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-siso-red/10 to-siso-orange/10 rounded-full filter blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-siso-orange/10 to-siso-red/10 rounded-full filter blur-[100px] animate-float-slower" />
        
        {/* Added particle-like decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-siso-orange/20 rounded-full animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Enhanced decorative ring behind heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-full filter blur-[50px]" />
          
          <GradientHeading variant="secondary" className="text-4xl md:text-5xl font-bold mb-6 relative">
            Why Choose Our Development Platform
          </GradientHeading>

          {/* Enhanced separator with animation */}
          <div className="relative h-1 w-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-siso-red to-siso-orange rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-siso-orange to-siso-red rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <p className="text-lg text-siso-text-muted max-w-2xl mx-auto relative">
            Accelerate your development workflow with cutting-edge AI tools and a supportive community of professionals
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              {/* Enhanced card background with multiple layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-xl transform group-hover:scale-105 transition-transform duration-300 blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-siso-red/3 to-siso-orange/3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-xl p-6 hover:border-siso-orange/20 transition-all duration-300">
                <div className="flex flex-col gap-4">
                  {/* Enhanced icon container with animations */}
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-siso-red to-siso-orange opacity-20 rounded-lg blur-md transform group-hover:scale-110 transition-transform duration-300" />
                    <div className="relative h-full p-3 rounded-lg bg-gradient-to-br from-siso-red/10 to-siso-orange/10 group-hover:from-siso-red/20 group-hover:to-siso-orange/20 transition-colors duration-300">
                      <feature.icon className="w-full h-full text-siso-orange animate-float-subtle" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-siso-text-bold bg-gradient-to-r from-white to-white/90 bg-clip-text">
                      {feature.title}
                    </h3>
                    
                    {/* Stats badge */}
                    <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-siso-red/10 to-siso-orange/10 text-sm text-siso-orange">
                      {feature.stats}
                    </div>
                    
                    <p className="text-siso-text/80 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Highlight tag */}
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-siso-orange animate-pulse" />
                      <span className="text-sm text-siso-text-bold">{feature.highlight}</span>
                    </div>
                  </div>
                </div>

                {/* Corner decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-siso-orange/20 rounded-full animate-pulse" />
                  <div className="absolute top-6 right-6 w-1 h-1 bg-siso-red/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { WhyChooseSection };
export default WhyChooseSection; // Adding default export
