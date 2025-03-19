
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
        <CardContent className="pt-8 px-4 md:px-8 pb-8">
          <div className="relative flex h-[400px] md:h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-gray-500 bg-clip-text text-center text-4xl md:text-6xl font-semibold leading-none text-transparent z-20">
              Tech Stack
            </span>

            {/* Inner Circles */}
            <OrbitingCircles
              className="size-[40px] md:size-[50px] border-none bg-transparent"
              duration={25}
              delay={5}
              radius={100}
            >
              <div className="w-10 h-10 md:w-12 md:h-12">
                <OpenAIIconBlack />
              </div>
            </OrbitingCircles>
            <OrbitingCircles
              className="size-[40px] md:size-[50px] border-none bg-transparent"
              duration={25}
              delay={15}
              radius={100}
            >
              <div className="w-10 h-10 md:w-12 md:h-12">
                <ClaudeAIIcon />
              </div>
            </OrbitingCircles>

            {/* Middle Circles */}
            <OrbitingCircles
              className="size-[40px] md:size-[50px] border-none bg-transparent"
              duration={30}
              delay={10}
              radius={150}
              reverse
            >
              <div className="w-10 h-10 md:w-12 md:h-12">
                <SupabaseIcon />
              </div>
            </OrbitingCircles>
            <OrbitingCircles
              className="size-[40px] md:size-[50px] border-none bg-transparent"
              duration={30}
              delay={25}
              radius={150}
              reverse
            >
              <div className="w-10 h-10 md:w-12 md:h-12">
                <Icons.logo className="text-white" />
              </div>
            </OrbitingCircles>

            {/* Outer Circles */}
            <OrbitingCircles
              className="size-[40px] md:size-[50px] border-none bg-transparent"
              radius={200}
              duration={35}
              delay={0}
            >
              <div className="w-10 h-10 md:w-12 md:h-12">
                <VercelIcon />
              </div>
            </OrbitingCircles>
            <OrbitingCircles
              className="size-[40px] md:size-[50px] border-none bg-transparent"
              radius={200}
              duration={35}
              delay={20}
            >
              <div className="w-10 h-10 md:w-12 md:h-12">
                <NextjsIcon />
              </div>
            </OrbitingCircles>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechStackSection;
