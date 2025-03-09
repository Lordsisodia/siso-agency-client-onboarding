
import React, { useEffect, useState } from 'react';
import { AgentMessage } from './AgentMessage';
import { ThinkingStep } from './ThinkingStep';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

// Sample thinking steps that will be shown in the UI
const THINKING_STEPS = [
  { title: "Analyzing project requirements", substeps: ["Extracting key objectives", "Identifying constraints", "Determining scope"] },
  { title: "Formulating timeline", substeps: ["Estimating task durations", "Identifying dependencies", "Setting milestones"] },
  { title: "Allocating resources", substeps: ["Determining team requirements", "Budgeting for materials", "Planning for contingencies"] },
  { title: "Finalizing plan", substeps: ["Creating documentation", "Preparing visualization", "Generating recommendations"] }
];

// Sample AI messages that will appear in sequence
const AI_RESPONSES = [
  { role: "assistant", content: "I'll help you create a comprehensive project plan. First, I need to understand your project goals and constraints." },
  { role: "assistant", content: "Based on my analysis, I've identified the key components needed for your project. I'm now creating a timeline with milestones." },
  { role: "assistant", content: "I've formulated a resource allocation plan that optimizes for your timeline and budget constraints." },
  { role: "assistant", content: "Your project plan is ready! I've created a detailed breakdown with tasks, dependencies, and resource requirements. You can now view the full plan and make adjustments as needed." }
];

export const AnimatedPlanningUI = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSubstep, setActiveSubstep] = useState(0);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Simulate the thinking process
  useEffect(() => {
    if (activeStep >= THINKING_STEPS.length) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      const currentStepSubsteps = THINKING_STEPS[activeStep].substeps;
      
      if (activeSubstep < currentStepSubsteps.length - 1) {
        // Move to next substep
        setActiveSubstep(activeSubstep + 1);
      } else {
        // Add AI message when step completes
        setMessages(prev => [...prev, AI_RESPONSES[activeStep]]);
        
        // Move to next step
        setActiveStep(activeStep + 1);
        setActiveSubstep(0);
      }

      // Update progress
      const totalSubsteps = THINKING_STEPS.reduce((acc, step) => acc + step.substeps.length, 0);
      const completedSubsteps = THINKING_STEPS.slice(0, activeStep).reduce((acc, step) => acc + step.substeps.length, 0) + activeSubstep + 1;
      setProgress(Math.min(100, (completedSubsteps / totalSubsteps) * 100));
      
    }, 1000 + Math.random() * 1000); // Random timing between 1-2 seconds

    return () => clearTimeout(timer);
  }, [activeStep, activeSubstep]);

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <Card className="p-4">
        <div className="mb-2 flex justify-between text-sm">
          <span>Planning progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </Card>

      {/* Thinking process visualization */}
      <div className="space-y-4">
        {THINKING_STEPS.map((step, stepIndex) => (
          <ThinkingStep
            key={stepIndex}
            title={step.title}
            substeps={step.substeps}
            isActive={stepIndex === activeStep}
            isComplete={stepIndex < activeStep}
            activeSubstep={stepIndex === activeStep ? activeSubstep : -1}
          />
        ))}
      </div>

      {/* AI messages */}
      <div className="space-y-4 mt-8">
        {messages.map((message, index) => (
          <AgentMessage key={index} message={message} />
        ))}
      </div>

      {/* Final plan view */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Project Plan Complete</h3>
            <p className="mb-4">Your project plan has been generated with the following key components:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">Timeline</h4>
                <p className="text-sm text-gray-600">12-week implementation with 4 major milestones</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">Resources</h4>
                <p className="text-sm text-gray-600">5 team members needed with specialized skills</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">Budget</h4>
                <p className="text-sm text-gray-600">Estimated $45,000 with 15% contingency</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">Critical Path</h4>
                <p className="text-sm text-gray-600">7 critical tasks identified with dependencies</p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                View Full Plan
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
