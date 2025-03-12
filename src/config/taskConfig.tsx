
import React from 'react';
import { 
  Package, 
  CheckSquare, 
  Rocket, 
  Code, 
  Flag 
} from 'lucide-react';
import { TaskPhase, PhaseInfo } from '@/types/task';

export const phaseConfig: Record<TaskPhase, PhaseInfo> = {
  'setup': {
    icon: <Package className="w-4 h-4" />,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    title: 'Project Setup',
    description: 'Initial project setup and requirements gathering'
  },
  'review': {
    icon: <CheckSquare className="w-4 h-4" />,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    title: 'Review & Approval',
    description: 'Review and approval of project requirements'
  },
  'initiation': {
    icon: <Rocket className="w-4 h-4" />,
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
    title: 'Project Initiation',
    description: 'Initiate the project and begin onboarding'
  },
  'development': {
    icon: <Code className="w-4 h-4" />,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    title: 'Development',
    description: 'Project development and implementation'
  },
  'completion': {
    icon: <Flag className="w-4 h-4" />,
    color: 'text-green-500 bg-green-500/10 border-green-500/20',
    title: 'Completion',
    description: 'Final review and project delivery'
  }
};
