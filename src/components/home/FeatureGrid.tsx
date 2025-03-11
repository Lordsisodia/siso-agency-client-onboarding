
import React from 'react';
import { Card } from '@/components/ui/card';
import { Feature } from './types';
import { Brain, Code, Database, Lightbulb } from 'lucide-react';

const features: Feature[] = [
  {
    title: 'AI-Powered Assistance',
    description: 'Get help from our advanced AI assistants to boost your productivity and learning.',
    icon: Brain
  },
  {
    title: 'Project Planning',
    description: 'Plan your projects effectively with our comprehensive planning tools.',
    icon: Lightbulb
  },
  {
    title: 'Code Generation',
    description: 'Generate code snippets and templates to accelerate your development process.',
    icon: Code
  },
  {
    title: 'Knowledge Base',
    description: 'Access our extensive knowledge base to find solutions to common problems.',
    icon: Database
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <Card key={index} className="p-6 border border-siso-border hover:border-siso-orange-200 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-siso-orange-100 p-2 text-siso-orange-600">
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-siso-text-light">{feature.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
