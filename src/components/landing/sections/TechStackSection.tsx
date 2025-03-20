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
  // Testimonials data for the animated testimonials component
  const testimonials = [{
    quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }, {
    quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }, {
    quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }, {
    quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }, {
    quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }];
  return <div className="container mx-auto px-4 py-20">
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

        <div className="relative h-1 w-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-siso-red to-siso-orange rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-siso-orange to-siso-red rounded-full animate-pulse" style={{
          animationDelay: '1s'
        }} />
        </div>
        
        <p className="text-lg text-siso-text-muted max-w-2xl mx-auto relative">
          We leverage industry-leading technologies to build robust, scalable, and performant applications
        </p>
      </motion.div>

      <Card className="border border-siso-text/10 bg-black/20 backdrop-blur-sm overflow-hidden mb-16">
        
      </Card>

      {/* Added AnimatedTestimonials component */}
      <Card className="border border-siso-text/10 bg-black/20 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-siso-text">
            What Our Users Say
          </h3>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} className="py-8" />
        </CardContent>
      </Card>
    </div>;
};
export default TechStackSection;