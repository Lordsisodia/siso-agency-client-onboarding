
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { ExternalLink, Filter, Search, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { FeaturedProjects } from '@/components/portfolio/FeaturedProjects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectFilters } from '@/components/portfolio/ProjectFilters';
import { ProjectDetailView } from '@/components/portfolio/ProjectDetailView';
import { ProjectSorter } from '@/components/portfolio/ProjectSorter';
import { Project, SortOption } from '@/components/portfolio/types';

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  useEffect(() => {
    // In a real app, this would be a fetch from an API
    setProjects(PROJECTS_DATA);
  }, []);

  useEffect(() => {
    let result = [...projects];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filters
    if (activeFilters.length > 0) {
      result = result.filter(project => 
        project.tags.some(tag => activeFilters.includes(tag))
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'reverseAlphabetical':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
    setFilteredProjects(result);
  }, [projects, searchQuery, activeFilters, sortOption]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        
        <div className="relative z-10 container px-4 py-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Our Portfolio
            </h1>
            <p className="mt-4 text-lg text-siso-text/80 max-w-2xl mx-auto">
              Discover our collection of custom applications built for agencies across different industries. Each project showcases our commitment to innovation and quality.
            </p>
          </motion.div>
          
          {/* Featured Projects Carousel */}
          <FeaturedProjects 
            projects={projects.filter(p => p.featured)} 
            onProjectClick={handleProjectClick}
          />
          
          {/* Search & Filters */}
          <div className="my-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-siso-orange/20">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="pl-10 bg-black/30 border-siso-orange/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-siso-text/50" />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <ProjectFilters onFilterChange={handleFilterChange} />
              <div className="h-8 w-px bg-siso-border/30 mx-1 hidden md:block"></div>
              <ProjectSorter onSortChange={handleSortChange} currentSort={sortOption} />
            </div>
          </div>
          
          {/* Project Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-xl border border-siso-orange/20 bg-black/20 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-siso-text-bold mb-2">No projects found</h3>
                <p className="text-siso-text/80">Try adjusting your search criteria or filters.</p>
                {activeFilters.length > 0 && (
                  <Button 
                    variant="link" 
                    onClick={() => setActiveFilters([])}
                    className="text-siso-orange mt-2"
                  >
                    Clear filters
                  </Button>
                )}
              </motion.div>
            </div>
          )}
          
          {/* Project Detail Dialog */}
          <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogContent className="max-w-4xl p-0 bg-black/90 border-siso-orange/30">
              {selectedProject && (
                <ProjectDetailView project={selectedProject} onClose={() => setDetailOpen(false)} />
              )}
            </DialogContent>
          </Dialog>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 p-8 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm text-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Ready to Build Your Custom App?</h3>
            <p className="text-siso-text/80 mb-6 max-w-2xl mx-auto">
              Our team specializes in creating tailor-made applications that solve your specific business challenges. Let's discuss your project!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="px-6 py-3 rounded-lg bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white font-medium transition-all">
                Start Your Project
              </Button>
              <Button variant="outline" className="px-6 py-3 rounded-lg border-siso-orange/40 text-siso-text-bold hover:bg-siso-orange/10">
                View Our Process
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}

// Mock data to populate the portfolio
const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: "Marketing Agency Dashboard",
    description: "Custom analytics dashboard that integrates with multiple ad platforms and provides real-time performance metrics.",
    fullDescription: "We developed a comprehensive marketing analytics dashboard that integrates data from Google Ads, Facebook Ads, and other marketing platforms. The dashboard provides real-time performance metrics, customizable reporting, and actionable insights to help the agency make data-driven decisions. The system includes automated alerts for campaign performance changes and budget optimization recommendations.",
    image: "/lovable-uploads/5ec1265d-9c09-4681-939b-a60fd4d06152.png",
    gallery: [
      "/lovable-uploads/5ec1265d-9c09-4681-939b-a60fd4d06152.png",
      "/lovable-uploads/10c752e6-33e8-40f9-9076-a5689232e11a.png",
      "/lovable-uploads/c9d84a03-c788-413c-8701-53881daf6476.png"
    ],
    tags: ["Web Application", "Analytics", "Marketing"],
    features: ["Real-time data visualization", "Multi-platform integration", "Automated reporting"],
    technologies: ["React", "Node.js", "MongoDB", "Google Analytics API", "Facebook Marketing API"],
    client: "DigiMarketing Solutions",
    date: "2023-05-15",
    duration: "3 months",
    challenge: "The client needed to consolidate data from multiple marketing platforms and create a unified view of their campaigns' performance across channels.",
    solution: "We built a custom dashboard that pulls data from various APIs, processes it, and presents actionable insights in an intuitive interface.",
    results: "50% reduction in reporting time, 30% increase in campaign optimization efficiency, and improved client retention rates.",
    testimonial: {
      text: "This dashboard has transformed how we manage campaigns and report to clients. It's become an indispensable part of our daily operations.",
      author: "Jane Smith, Marketing Director",
      company: "DigiMarketing Solutions"
    },
    featured: true
  },
  {
    id: '2',
    title: "Client Management System",
    description: "Comprehensive CRM solution for a creative agency to manage projects, clients, and communication in one place.",
    fullDescription: "We built a tailored client management system for a creative agency that needed to streamline their client relations, project management, and internal communication. The system includes client profiles, project timelines, document sharing, automated invoicing, and a client portal for transparent communication. The platform helped the agency scale their operations while maintaining high client satisfaction rates.",
    image: "/lovable-uploads/c9d84a03-c788-413c-8701-53881daf6476.png",
    gallery: [
      "/lovable-uploads/c9d84a03-c788-413c-8701-53881daf6476.png",
      "/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png",
      "/lovable-uploads/5ec1265d-9c09-4681-939b-a60fd4d06152.png"
    ],
    tags: ["CRM", "Project Management", "Communication"],
    features: ["Client portal", "Project timeline tracking", "Integrated messaging"],
    technologies: ["Vue.js", "Laravel", "MySQL", "AWS", "Twilio API"],
    client: "Artistry Creative Group",
    date: "2023-01-20",
    duration: "4 months",
    challenge: "The agency struggled with disconnected tools for project management, client communication, and invoicing, leading to inefficiencies and occasional miscommunications.",
    solution: "We developed a unified platform that connects all aspects of client management with automated workflows and transparent communication channels.",
    results: "25% increase in project delivery efficiency, 40% reduction in administrative tasks, and improved client satisfaction scores.",
    testimonial: {
      text: "This system has revolutionized how we work with clients. Everything is now organized, accessible, and professional - our clients love the portal.",
      author: "Michael Johnson, CEO",
      company: "Artistry Creative Group"
    },
    featured: true
  },
  {
    id: '3',
    title: "Resource Allocation Tool",
    description: "Team and resource management application that optimizes staff allocation across multiple client projects.",
    fullDescription: "We created a sophisticated resource allocation system for a digital agency with 50+ team members working across various projects. The tool helps managers assign the right people to projects based on skills, availability, and project requirements. It includes capacity planning, skill matching, and predictive analytics to forecast resource needs for upcoming projects. The system integrates with their project management software for seamless workflow.",
    image: "/lovable-uploads/10c752e6-33e8-40f9-9076-a5689232e11a.png",
    gallery: [
      "/lovable-uploads/10c752e6-33e8-40f9-9076-a5689232e11a.png",
      "/lovable-uploads/c9d84a03-c788-413c-8701-53881daf6476.png",
      "/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png"
    ],
    tags: ["Team Management", "Resource Planning", "Optimization"],
    features: ["Drag-and-drop scheduling", "Capacity planning", "Skill matching"],
    technologies: ["React", "GraphQL", "PostgreSQL", "Redis", "Elasticsearch"],
    client: "WebWorks Agency",
    date: "2022-11-10",
    duration: "3.5 months",
    challenge: "The agency was struggling with resource conflicts, underutilized talent, and difficulty planning for future project needs.",
    solution: "We built an intelligent resource management system that provides clear visibility into team availability and automatically suggests optimal resource allocation.",
    results: "35% improvement in resource utilization, reduced project delays by 40%, and better work-life balance for team members.",
    testimonial: {
      text: "This tool has transformed our resource planning from a weekly headache into a strategic advantage. We can now confidently take on more projects without overloading our team.",
      author: "Sarah Williams, Operations Director",
      company: "WebWorks Agency"
    },
    featured: true
  },
  {
    id: '4',
    title: "Content Creation Platform",
    description: "End-to-end content production platform with workflow management, approval processes, and publishing integrations.",
    fullDescription: "We developed a comprehensive content creation platform for a media agency that manages content production for multiple brands. The platform includes an editorial calendar, content briefs, writer/editor assignment, review workflows, version control, and multi-channel publishing capabilities. It integrates with WordPress, social media platforms, and email marketing systems for seamless content distribution.",
    image: "/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png",
    gallery: [
      "/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png",
      "/lovable-uploads/5ec1265d-9c09-4681-939b-a60fd4d06152.png",
      "/lovable-uploads/10c752e6-33e8-40f9-9076-a5689232e11a.png"
    ],
    tags: ["Content Management", "Workflow", "Publishing"],
    features: ["Editorial calendar", "Version control", "Multi-channel publishing"],
    technologies: ["Next.js", "Node.js", "MongoDB", "AWS S3", "WordPress API"],
    client: "ContentPro Agency",
    date: "2022-09-05",
    duration: "5 months",
    challenge: "The agency needed to streamline their content production process, which was managed across multiple tools and email chains, causing delays and quality issues.",
    solution: "We created a unified platform to manage the entire content lifecycle from ideation to publication, with clear workflows and accountability.",
    results: "Content production capacity increased by 60%, approval cycles reduced by 50%, and publishing errors decreased by 90%.",
    testimonial: {
      text: "This platform has transformed our content operation. We've been able to scale our output while maintaining quality and meeting all client deadlines.",
      author: "David Chen, Content Director",
      company: "ContentPro Agency"
    },
    featured: false
  },
  {
    id: '5',
    title: "E-commerce Analytics Suite",
    description: "Comprehensive analytics solution for e-commerce businesses to track performance across multiple channels and optimize conversions.",
    fullDescription: "We built a specialized analytics suite for e-commerce agencies to provide their clients with deep insights into store performance, customer behavior, and marketing effectiveness. The platform integrates with major e-commerce platforms (Shopify, WooCommerce, Magento) and provides custom dashboards, funnel analysis, cohort tracking, and revenue attribution models. Advanced features include AI-powered product recommendations and predictive inventory management.",
    image: "/lovable-uploads/10c752e6-33e8-40f9-9076-a5689232e11a.png",
    gallery: [
      "/lovable-uploads/10c752e6-33e8-40f9-9076-a5689232e11a.png", 
      "/lovable-uploads/c9d84a03-c788-413c-8701-53881daf6476.png",
      "/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png"
    ],
    tags: ["E-commerce", "Analytics", "Optimization"],
    features: ["Multi-store tracking", "Customer journey mapping", "Revenue attribution"],
    technologies: ["React", "Python", "Django", "BigQuery", "TensorFlow"],
    client: "DigiCommerce Partners",
    date: "2022-07-15",
    duration: "6 months",
    challenge: "E-commerce agencies struggled to provide clients with actionable insights from the vast amount of data available across multiple platforms and marketing channels.",
    solution: "Our analytics suite consolidates all data sources and provides clear, actionable insights with specific recommendations for optimizing store performance.",
    results: "Clients using the platform saw an average of 28% increase in conversion rates and 35% improvement in marketing ROI.",
    testimonial: {
      text: "This analytics suite has become our secret weapon. It gives us insights that our competitors simply don't have access to, allowing us to deliver exceptional results for our e-commerce clients.",
      author: "Alex Rivera, Analytics Lead",
      company: "DigiCommerce Partners"
    },
    featured: false
  },
  {
    id: '6',
    title: "Agency Operations Hub",
    description: "Centralized operations platform for digital agencies to manage resources, finances, and business metrics in one place.",
    fullDescription: "We created a comprehensive operations hub for digital agencies to manage all aspects of their business. The platform includes resource management, financial tracking, client profitability analysis, team utilization metrics, and business intelligence dashboards. It integrates with accounting software, time tracking tools, and project management systems to provide a complete view of agency health and performance. The system also includes forecasting and scenario planning tools.",
    image: "/lovable-uploads/c9d84a03-c788-413c-8701-53881daf6476.png",
    gallery: [
      "/lovable-uploads/c9d84a03-c788-413c-8701-53881daf6476.png",
      "/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png",
      "/lovable-uploads/5ec1265d-9c09-4681-939b-a60fd4d06152.png"
    ],
    tags: ["Operations", "Financial Management", "Business Intelligence"],
    features: ["Profitability tracking", "Resource utilization", "Financial forecasting"],
    technologies: ["Angular", ".NET Core", "SQL Server", "Power BI", "QuickBooks API"],
    client: "Agency Collective",
    date: "2022-04-20",
    duration: "7 months",
    challenge: "Growing agencies struggled to maintain visibility into their operations, financial health, and resource allocation as they scaled.",
    solution: "We developed a centralized operations platform that connects all aspects of agency management with powerful analytics and forecasting capabilities.",
    results: "25% improvement in profit margins, 30% better resource utilization, and significant reduction in administrative overhead.",
    testimonial: {
      text: "This operations hub has transformed how we run our agency. We now have complete visibility into our performance and can make data-driven decisions that directly impact our bottom line.",
      author: "Lisa Thompson, Managing Director",
      company: "Agency Collective"
    },
    featured: false
  }
];
