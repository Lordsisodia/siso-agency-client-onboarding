
import { PhaseInfo } from '@/types/task';
import { ClipboardCheck, FileSearch, Lightbulb, Code, CheckCircle } from 'lucide-react';
import React from 'react';

// Create proper icon components instead of factory functions
const createIconElement = (IconComponent: any) => {
  return React.createElement(IconComponent, { className: "w-4 h-4" });
};

export const phaseConfig: Record<string, PhaseInfo> = {
  'setup': {
    icon: createIconElement(ClipboardCheck),
    color: 'bg-blue-500 text-white',
    title: 'Project Setup',
    description: 'Initial project configuration and resource allocation'
  },
  'review': {
    icon: createIconElement(FileSearch),
    color: 'bg-purple-500 text-white',
    title: 'Review & Analysis',
    description: 'Requirements gathering and feasibility assessment'
  },
  'initiation': {
    icon: createIconElement(Lightbulb),
    color: 'bg-pink-500 text-white',
    title: 'Project Initiation',
    description: 'Kickoff and initial planning phase'
  },
  'development': {
    icon: createIconElement(Code),
    color: 'bg-amber-500 text-white',
    title: 'Development',
    description: 'Active development and implementation'
  },
  'completion': {
    icon: createIconElement(CheckCircle),
    color: 'bg-green-500 text-white',
    title: 'Completion',
    description: 'Final review, delivery, and project closure'
  }
};

// Project status indicators and colors
export const projectStatusConfig = {
  'draft': {
    color: 'bg-slate-500',
    label: 'Draft'
  },
  'active': {
    color: 'bg-blue-500',
    label: 'Active'
  },
  'completed': {
    color: 'bg-green-500',
    label: 'Completed'
  },
  'on-hold': {
    color: 'bg-amber-500',
    label: 'On Hold'
  },
  'cancelled': {
    color: 'bg-red-500',
    label: 'Cancelled'
  }
};

// Priority levels and colors
export const priorityConfig = {
  'low': {
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    label: 'Low'
  },
  'medium': {
    color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    label: 'Medium'
  },
  'high': {
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
    label: 'High'
  }
};
