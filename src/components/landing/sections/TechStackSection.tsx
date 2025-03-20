
import { Card, CardContent } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { motion } from 'framer-motion';
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

      {/* Platform testimonials */}
      <Card className="border border-siso-text/10 bg-black/20 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4 md:p-8">
          <AnimatedTestimonials testimonials={platformTestimonials} autoplay={true} className="py-4" />
        </CardContent>
      </Card>
    </div>;
};
export default TechStackSection;
