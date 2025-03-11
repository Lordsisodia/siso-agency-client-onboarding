
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Github, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'design' | 'other';
  completed: boolean;
  demoUrl?: string;
  repoUrl?: string;
  date: string;
}

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // Sample portfolio projects - in a real app, this would come from an API
  const projects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with payment processing and inventory management',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'web',
      completed: true,
      demoUrl: 'https://example.com',
      repoUrl: 'https://github.com/example/ecommerce',
      date: '2023-08-15'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A mobile application for managing personal and team tasks with real-time updates',
      image: '/placeholder.svg',
      technologies: ['React Native', 'Firebase', 'Redux'],
      category: 'mobile',
      completed: true,
      demoUrl: 'https://example.com/task-app',
      date: '2023-06-10'
    },
    {
      id: '3',
      title: 'Corporate Website Redesign',
      description: 'Complete redesign of a corporate website focusing on modern UI/UX principles',
      image: '/placeholder.svg',
      technologies: ['Figma', 'HTML/CSS', 'JavaScript'],
      category: 'design',
      completed: true,
      demoUrl: 'https://example.com/redesign',
      date: '2023-04-25'
    },
    {
      id: '4',
      title: 'Community Forum',
      description: 'An online forum for community discussions with user authentication and moderation tools',
      image: '/placeholder.svg',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      category: 'web',
      completed: false,
      repoUrl: 'https://github.com/example/forum',
      date: '2023-09-01'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold">Portfolio</h1>
          <div className="mb-6">
            <p className="text-gray-500">Showcase of your projects and work</p>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden flex flex-col h-full">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        {!project.completed && (
                          <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                            In Progress
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="text-sm text-gray-500">{project.date}</div>
                      <div className="flex space-x-2">
                        {project.demoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-4 w-4" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {project.repoUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-1 h-4 w-4" />
                              Repo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
