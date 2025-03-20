
import { Card, CardContent } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { allLogos } from '../constants';
import { motion } from 'framer-motion';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { Icons } from '@/components/ui/icons';
import { SupabaseIcon } from '@/components/ui/icons/SupabaseIcon';
import { VercelIcon } from '@/components/ui/icons/VercelIcon';
import { NextjsIcon } from '@/components/ui/icons/NextjsIcon';
import { OpenAIIconBlack } from '@/components/ui/icons/OpenAIIcon';
import { ClaudeAIIcon } from '@/components/ui/icons/ClaudeAIIcon';
import { LucideGithub, LucideNotebook, LucideCircle } from 'lucide-react';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

export const TechStackSection = () => {
  // Updated testimonials to showcase tech platforms instead of people
  const platformTestimonials = [
    {
      quote: "Serverless PostgreSQL database with real-time subscriptions, authentication, instant APIs, Edge Functions, and comprehensive storage solutions.",
      name: "Supabase",
      designation: "Database & Authentication",
      src: "https://supabase.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsupabase-logo-wordmark--dark.22ede95d.png&w=256&q=75"
    },
    {
      quote: "Deploy web applications with zero configuration, automatic SSL, and global CDN for the fastest possible edge delivery.",
      name: "Vercel",
      designation: "Hosting & Deployment",
      src: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png"
    },
    {
      quote: "The React framework for production-grade applications with server-side rendering, routing, and optimized developer experience.",
      name: "Next.js",
      designation: "Web Framework",
      src: "https://www.datocms-assets.com/75941/1657707878-nextjs_logo.png"
    },
    {
      quote: "State-of-the-art language models with natural language processing capabilities for generating human-quality text and code.",
      name: "OpenAI",
      designation: "AI Integration",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png"
    },
    {
      quote: "Conversational AI assistant built with Constitutional AI and trained to be helpful, harmless, and honest in its responses.",
      name: "Claude AI",
      designation: "Language Intelligence",
      src: "https://images.prismic.io/contrary-research/36140224-fe2a-4967-af63-ffad7c0a028b_Claude-logo.png?auto=compress,format"
    }
  ];
  
  return <div className="container mx-auto px-4 py-20" id="tech-stack">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.6
    }} className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-full filter blur-[50px]" />
        
        <GradientHeading variant="secondary" className="text-4xl md:text-5xl font-bold mb-6 relative">
          Built With Modern Tech Stack
        </GradientHeading>
        
        <p className="text-lg text-siso-text-muted max-w-2xl mx-auto relative">
          We leverage industry-leading technologies to build robust, scalable, and performant applications
        </p>
      </motion.div>

      {/* Platform testimonials moved up, replacing the gradient divider */}
      <Card className="border border-siso-text/10 bg-black/20 backdrop-blur-sm overflow-hidden mb-16">
        <CardContent className="p-4 md:p-8">
          <AnimatedTestimonials testimonials={platformTestimonials} autoplay={true} className="py-4" />
        </CardContent>
      </Card>

      {/* Tech orbit visualization */}
      <Card className="border border-siso-text/10 bg-black/20 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="relative h-[400px] flex items-center justify-center">
            {/* Center Icon */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-r from-siso-red/20 to-siso-orange/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <LucideGithub className="w-8 h-8 text-white/70" />
              </div>
            </div>
            
            {/* First Orbit */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-[200px] h-[200px] absolute pointer-events-none">
                <circle cx="50%" cy="50%" r="95" fill="none" stroke="rgba(255,255,255,0.05)" />
              </svg>
              
              <div className="absolute w-10 h-10" style={{ transform: `rotate(30deg) translateX(95px) rotate(-30deg)` }}>
                <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <SupabaseIcon className="w-5 h-5 text-white/70" />
                </div>
              </div>
              
              <div className="absolute w-10 h-10" style={{ transform: `rotate(150deg) translateX(95px) rotate(-150deg)` }}>
                <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <VercelIcon className="w-5 h-5 text-white/70" />
                </div>
              </div>
              
              <div className="absolute w-10 h-10" style={{ transform: `rotate(270deg) translateX(95px) rotate(-270deg)` }}>
                <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <NextjsIcon className="w-5 h-5 text-white/70" />
                </div>
              </div>
            </div>
            
            {/* Second Orbit */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-[300px] h-[300px] absolute pointer-events-none">
                <circle cx="50%" cy="50%" r="145" fill="none" stroke="rgba(255,255,255,0.05)" />
              </svg>
              
              <div className="absolute w-10 h-10" style={{ transform: `rotate(60deg) translateX(145px) rotate(-60deg)` }}>
                <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <OpenAIIconBlack className="w-5 h-5 text-white/70" />
                </div>
              </div>
              
              <div className="absolute w-10 h-10" style={{ transform: `rotate(180deg) translateX(145px) rotate(-180deg)` }}>
                <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <ClaudeAIIcon className="w-5 h-5 text-white/70" />
                </div>
              </div>
              
              <div className="absolute w-10 h-10" style={{ transform: `rotate(300deg) translateX(145px) rotate(-300deg)` }}>
                <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <LucideNotebook className="w-5 h-5 text-white/70" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default TechStackSection;
