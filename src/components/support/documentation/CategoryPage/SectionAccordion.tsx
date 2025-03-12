
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocSection } from '@/types/documentation';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { QuestionAccordion } from './QuestionAccordion';

interface SectionAccordionProps {
  section: DocSection;
  categorySlug: string;
  articleSlug: string;
}

export const SectionAccordion = ({ 
  section, 
  categorySlug, 
  articleSlug 
}: SectionAccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="mb-6 border border-siso-border overflow-hidden">
      <div 
        className="p-4 cursor-pointer flex justify-between items-center bg-siso-bg-card/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{section.title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-siso-text/60" />
        ) : (
          <ChevronDown className="h-5 w-5 text-siso-text/60" />
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="divide-y divide-siso-border/20">
                {section.questions.map((question) => (
                  <div key={question.id} className="px-6">
                    <QuestionAccordion 
                      question={question} 
                      categorySlug={categorySlug} 
                      articleSlug={articleSlug} 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
