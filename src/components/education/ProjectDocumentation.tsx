
import React from 'react';

export const ProjectDocumentation: React.FC = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Project Documentation</h2>
        <p className="text-lg mb-4">
          Welcome to the SISO platform documentation. This guide provides information about how to use the platform effectively.
        </p>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Create a new project from the Dashboard or Projects section</li>
          <li>Use the Plan Builder to define your project requirements</li>
          <li>Track your project progress and metrics from the Dashboard</li>
        </ul>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-siso-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Plan Builder</h4>
            <p>Create detailed project plans with requirements, features, and specifications.</p>
          </div>
          <div className="border border-siso-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">AI Assistant</h4>
            <p>Get help and guidance from our AI assistant throughout your project.</p>
          </div>
          <div className="border border-siso-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Project Dashboard</h4>
            <p>Monitor project progress, metrics, and key performance indicators.</p>
          </div>
          <div className="border border-siso-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Support</h4>
            <p>Access help and documentation when needed through our support center.</p>
          </div>
        </div>
      </section>

      <section className="bg-siso-bg-highlight/10 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Need more help?</h3>
        <p>
          If you can't find what you're looking for in the documentation, 
          switch to the Chat Assistance tab to get personalized help from our AI assistant.
        </p>
      </section>
    </div>
  );
};
