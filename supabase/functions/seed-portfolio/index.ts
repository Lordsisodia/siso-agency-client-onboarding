
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample projects data
const PROJECTS_DATA = [
  {
    title: "SISO Resource Hub",
    description: "Centralized knowledge platform for agencies to access tools, templates, and training materials in a single interface.",
    full_description: "The SISO Resource Hub is a comprehensive knowledge management platform designed specifically for agencies. It provides a centralized location for all agency resources including templates, tools, training materials, and best practices. The system features a smart search, personalized recommendations, and a collaborative workspace where team members can share and update resources. The platform includes role-based access controls, analytics on resource usage, and integration with existing workflow tools.",
    image: "/lovable-uploads/5ec1265d-9c09-4681-939b-a60fd4d06152.png",
    gallery: [
      "/lovable-uploads/5ec1265d-9c09-4681-939b-a60fd4d06152.png",
      "/lovable-uploads/67e004ed-6861-4d6a-b05e-d885a03e5c1e.png",
      "/lovable-uploads/10c752e6-33e8-40f9-9076-a5689232e11a.png"
    ],
    tags: ["Web Application", "Content Management", "Team Management", "Knowledge Base"],
    features: ["Smart search functionality", "Personalized resource recommendations", "Role-based access controls", "Usage analytics dashboard", "Collaborative workspaces"],
    technologies: ["React", "Node.js", "PostgreSQL", "Elasticsearch", "AWS S3", "Redis"],
    client: "SISO Agency Solutions",
    date: "2023-08-10",
    duration: "4 months",
    challenge: "The client struggled with scattered information across different platforms and tools, leading to inefficiencies, duplicate work, and difficulty finding the most current versions of resources.",
    solution: "We developed a centralized Resource Hub with intelligent search capabilities, version control, and personalized recommendations based on user roles and history. The system was designed with a focus on user experience and easy knowledge sharing.",
    results: "45% reduction in time spent searching for resources, 30% increase in resource utilization, and significant improvement in collaboration and knowledge sharing across teams.",
    testimonial: {
      text: "The Resource Hub has transformed how our teams access and share knowledge. What used to take hours now takes minutes, and we've seen a notable improvement in work quality as everyone has access to the best resources.",
      author: "Sarah Johnson, Operations Director",
      company: "SISO Agency Solutions"
    },
    featured: true
  },
  {
    title: "Marketing Agency Dashboard",
    description: "Custom analytics dashboard that integrates with multiple ad platforms and provides real-time performance metrics.",
    full_description: "We developed a comprehensive marketing analytics dashboard that integrates data from Google Ads, Facebook Ads, and other marketing platforms. The dashboard provides real-time performance metrics, customizable reporting, and actionable insights to help the agency make data-driven decisions. The system includes automated alerts for campaign performance changes and budget optimization recommendations.",
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
    title: "Client Management System",
    description: "Comprehensive CRM solution for a creative agency to manage projects, clients, and communication in one place.",
    full_description: "We built a tailored client management system for a creative agency that needed to streamline their client relations, project management, and internal communication. The system includes client profiles, project timelines, document sharing, automated invoicing, and a client portal for transparent communication. The platform helped the agency scale their operations while maintaining high client satisfaction rates.",
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
    title: "Resource Allocation Tool",
    description: "Team and resource management application that optimizes staff allocation across multiple client projects.",
    full_description: "We created a sophisticated resource allocation system for a digital agency with 50+ team members working across various projects. The tool helps managers assign the right people to projects based on skills, availability, and project requirements. It includes capacity planning, skill matching, and predictive analytics to forecast resource needs for upcoming projects. The system integrates with their project management software for seamless workflow.",
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
    title: "Content Creation Platform",
    description: "End-to-end content production platform with workflow management, approval processes, and publishing integrations.",
    full_description: "We developed a comprehensive content creation platform for a media agency that manages content production for multiple brands. The platform includes an editorial calendar, content briefs, writer/editor assignment, review workflows, version control, and multi-channel publishing capabilities. It integrates with WordPress, social media platforms, and email marketing systems for seamless content distribution.",
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
    title: "E-commerce Analytics Suite",
    description: "Comprehensive analytics solution for e-commerce businesses to track performance across multiple channels and optimize conversions.",
    full_description: "We built a specialized analytics suite for e-commerce agencies to provide their clients with deep insights into store performance, customer behavior, and marketing effectiveness. The platform integrates with major e-commerce platforms (Shopify, WooCommerce, Magento) and provides custom dashboards, funnel analysis, cohort tracking, and revenue attribution models. Advanced features include AI-powered product recommendations and predictive inventory management.",
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
    title: "Agency Operations Hub",
    description: "Centralized operations platform for digital agencies to manage resources, finances, and business metrics in one place.",
    full_description: "We created a comprehensive operations hub for digital agencies to manage all aspects of their business. The platform includes resource management, financial tracking, client profitability analysis, team utilization metrics, and business intelligence dashboards. It integrates with accounting software, time tracking tools, and project management systems to provide a complete view of agency health and performance. The system also includes forecasting and scenario planning tools.",
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

// Initial categories
const CATEGORIES = [
  {
    name: "Web Application",
    description: "Custom web-based applications for businesses and organizations"
  },
  {
    name: "Analytics",
    description: "Data analysis and visualization tools"
  },
  {
    name: "Marketing",
    description: "Tools for digital marketing campaigns and performance tracking"
  },
  {
    name: "CRM",
    description: "Customer relationship management solutions"
  },
  {
    name: "Project Management",
    description: "Tools for managing projects, tasks, and team collaboration"
  },
  {
    name: "Team Management",
    description: "Solutions for managing team members and resources"
  },
  {
    name: "Resource Planning",
    description: "Applications for allocating and optimizing resources"
  },
  {
    name: "Optimization",
    description: "Tools that improve performance and efficiency"
  },
  {
    name: "Content Management",
    description: "Systems for creating, managing, and publishing content"
  },
  {
    name: "Workflow",
    description: "Process automation and workflow management solutions"
  },
  {
    name: "Publishing",
    description: "Tools for publishing and distributing content"
  },
  {
    name: "E-commerce",
    description: "Online store and e-commerce management solutions"
  },
  {
    name: "Operations",
    description: "Systems for managing business operations"
  },
  {
    name: "Financial Management",
    description: "Tools for financial tracking and management"
  },
  {
    name: "Business Intelligence",
    description: "Data analysis and reporting for business decision making"
  },
  {
    name: "Communication",
    description: "Tools for team and client communication"
  },
  {
    name: "Knowledge Base",
    description: "Centralized systems for organization-wide knowledge management"
  }
];

serve(async (req) => {
  try {
    // Check if there's a request to clear existing data
    const url = new URL(req.url);
    const clearExisting = url.searchParams.get('clear') === 'true';
    
    // Clear existing data if requested
    if (clearExisting) {
      await supabase.from('portfolio_projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('portfolio_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    }
    
    // Insert categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('portfolio_categories')
      .upsert(CATEGORIES.map(category => ({
        name: category.name,
        description: category.description
      })))
      .select();
    
    if (categoriesError) {
      throw new Error(`Error inserting categories: ${categoriesError.message}`);
    }
    
    // Insert projects
    const { data: projectsData, error: projectsError } = await supabase
      .from('portfolio_projects')
      .upsert(PROJECTS_DATA.map(project => ({
        title: project.title,
        description: project.description,
        full_description: project.full_description,
        image: project.image,
        gallery: project.gallery,
        tags: project.tags,
        features: project.features,
        technologies: project.technologies,
        client: project.client,
        date: project.date,
        duration: project.duration,
        challenge: project.challenge,
        solution: project.solution,
        results: project.results,
        testimonial: project.testimonial,
        featured: project.featured
      })))
      .select();
    
    if (projectsError) {
      throw new Error(`Error inserting projects: ${projectsError.message}`);
    }
    
    return new Response(
      JSON.stringify({
        message: "Portfolio data seeded successfully",
        categories: categoriesData?.length || 0,
        projects: projectsData?.length || 0
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while seeding the database"
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
