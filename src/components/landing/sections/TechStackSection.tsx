
import { Card, CardContent } from '@/components/ui/card';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { LogoCarousel } from '@/components/ui/logo-carousel';
import { allLogos } from '../constants';
import { motion } from 'framer-motion';

export const TechStackSection = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-full filter blur-[50px]" />
        
        <GradientHeading variant="secondary" className="text-4xl md:text-5xl font-bold mb-6 relative">
          Built With Modern Tech Stack
        </GradientHeading>

        <div className="relative h-1 w-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-siso-red to-siso-orange rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-siso-orange to-siso-red rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <p className="text-lg text-siso-text-muted max-w-2xl mx-auto relative">
          We leverage industry-leading technologies to build robust, scalable, and performant applications
        </p>
      </motion.div>

      <Card className="border border-siso-text/10 bg-black/20 backdrop-blur-sm overflow-hidden">
        <CardContent className="pt-8 px-4 md:px-8">
          <LogoCarousel logos={allLogos} columnCount={3} speed={15} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TechStackSection;
