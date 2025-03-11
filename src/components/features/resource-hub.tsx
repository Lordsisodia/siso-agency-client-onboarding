
import React from 'react';

export interface ResourceHubProps {
  title?: string;
  description?: string;
  resources?: Array<{
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    link?: string;
  }>;
}

export const ResourceHub: React.FC<ResourceHubProps> = ({ 
  title = "Resources", 
  description = "Helpful resources for your projects",
  resources = [] 
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-500">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="p-4 border rounded-lg">
            {resource.icon}
            <h3 className="font-semibold">{resource.title}</h3>
            <p className="text-sm text-gray-500">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
