
import React from 'react';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { LogoCarousel } from '@/components/ui/logo-carousel';
import { motion } from 'framer-motion';
import { SupabaseIcon } from '@/components/ui/icons/SupabaseIcon';
import { VercelIcon } from '@/components/ui/icons/VercelIcon';
import { TailwindCSSIcon } from '@/components/ui/icons/TailwindCSSIcon';
import { TypeScriptIcon } from '@/components/ui/icons/TypeScriptIcon';
import { NextjsIcon } from '@/components/ui/icons/NextjsIcon';
import { OpenAIIconBlack } from '@/components/ui/icons/OpenAIIcon';
import { ClaudeAIIcon } from '@/components/ui/icons/ClaudeAIIcon';
import { StripeIcon } from '@/components/ui/icons/StripeIcon';
import { UpstashIcon } from '@/components/ui/icons/UpstashIcon';

export const TechStackSection = () => {
  const techLogos = [
    { id: 1, name: "Next.js", img: NextjsIcon },
    { id: 2, name: "TypeScript", img: TypeScriptIcon },
    { id: 3, name: "TailwindCSS", img: TailwindCSSIcon },
    { id: 4, name: "Supabase", img: SupabaseIcon },
    { id: 5, name: "Vercel", img: VercelIcon },
    { id: 6, name: "OpenAI", img: OpenAIIconBlack },
    { id: 7, name: "Claude AI", img: ClaudeAIIcon },
    { id: 8, name: "Stripe", img: StripeIcon },
    { id: 9, name: "Upstash", img: UpstashIcon },
  ];

  return (
    <section className="py-16 md:py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm md:text-base font-medium tracking-widest text-siso-text-muted uppercase mb-3">
            Enterprise-Grade Technology
          </p>
          <GradientHeading variant="secondary" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Built with Battle-Tested Stack
          </GradientHeading>
          <p className="text-lg text-siso-text-muted max-w-2xl mx-auto">
            We use industry-leading technologies to build scalable, secure, and high-performance applications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-xl p-6 md:p-10"
        >
          {/* Tech logos carousel */}
          <LogoCarousel 
            logos={techLogos} 
            columnCount={3}
            speed={15}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
