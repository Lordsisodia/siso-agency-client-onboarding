
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DocQuestion } from '@/types/documentation';

interface QuestionAccordionProps {
  question: DocQuestion;
  categorySlug: string;
  articleSlug: string;
}

export const QuestionAccordion = ({ 
  question, 
  categorySlug, 
  articleSlug 
}: QuestionAccordionProps) => {
  const navigate = useNavigate();
  
  const handleQuestionClick = () => {
    navigate(`/support/${categorySlug}/${articleSlug}/${question.slug}`);
  };
  
  return (
    <div className="border-b border-siso-border/50 last:border-b-0">
      <button 
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        onClick={handleQuestionClick}
      >
        <h4 className="font-medium text-siso-text">{question.question}</h4>
        <ChevronRight className="h-5 w-5 text-siso-text/60" />
      </button>
    </div>
  );
};
