
interface Project {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: string;
  user_id: string;
  details?: {
    business_context?: {
      industry: string;
      companyName: string;
      scale: string;
      target_audience: string[];
    };
    goals?: string;
    features?: {
      core: string[];
      extras: string[];
    };
    timeline?: {
      estimated_weeks: number;
      phases: {
        name: string;
        duration: string;
        tasks: string[];
      }[];
    };
    resources?: {
      id: string;
      name: string;
      type: string;
      url: string;
    }[];
  };
}

// Sample demo projects data
export const demoProjects: Project[] = [
  {
    id: "demo-1",
    title: "E-Commerce Mobile App",
    description: "A feature-rich mobile shopping application with personalized recommendations and secure payment processing.",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: "active",
    user_id: "demo-user",
    details: {
      business_context: {
        industry: "Retail",
        companyName: "ShopSmart",
        scale: "Medium",
        target_audience: ["Young adults", "Tech-savvy shoppers", "Mobile users"]
      },
      goals: "Create a seamless shopping experience for users with personalized product recommendations and streamlined checkout process to increase conversion rates and customer retention.",
      features: {
        core: [
          "Product search and filtering",
          "User account management",
          "Wishlist functionality",
          "Secure checkout with multiple payment options",
          "Order tracking",
          "Product reviews and ratings"
        ],
        extras: [
          "AR product preview",
          "Voice search capabilities",
          "Social media sharing",
          "Loyalty program",
          "In-app customer support chat"
        ]
      },
      timeline: {
        estimated_weeks: 12,
        phases: [
          {
            name: "Planning & Design",
            duration: "3 weeks",
            tasks: [
              "Requirements gathering",
              "User flow mapping",
              "Wireframing",
              "UI/UX design",
              "Design system creation"
            ]
          },
          {
            name: "Core Development",
            duration: "5 weeks",
            tasks: [
              "App architecture setup",
              "User authentication",
              "Product catalog implementation",
              "Search and filtering functionality",
              "Cart and checkout process"
            ]
          },
          {
            name: "Advanced Features",
            duration: "2 weeks",
            tasks: [
              "Payment gateway integration",
              "Wishlist functionality",
              "User reviews implementation",
              "Order management system"
            ]
          },
          {
            name: "Testing & Deployment",
            duration: "2 weeks",
            tasks: [
              "QA testing",
              "Performance optimization",
              "Beta testing with select users",
              "App store submission preparation",
              "Deployment"
            ]
          }
        ]
      },
      resources: [
        { id: '1', name: 'Mobile App Design Guidelines', type: 'document', url: '#' },
        { id: '2', name: 'Payment Gateway API Docs', type: 'link', url: '#' },
        { id: '3', name: 'Frontend Repository', type: 'code', url: '#' },
        { id: '4', name: 'Product Database Schema', type: 'database', url: '#' },
        { id: '5', name: 'Brand Assets', type: 'image', url: '#' }
      ]
    }
  },
  {
    id: "demo-2",
    title: "Task Management Dashboard",
    description: "A comprehensive task management system with team collaboration features and progress analytics.",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: "active",
    user_id: "demo-user",
    details: {
      business_context: {
        industry: "Productivity",
        companyName: "TaskFlow",
        scale: "Small",
        target_audience: ["Remote teams", "Project managers", "Freelancers"]
      },
      goals: "Develop an intuitive task management platform that enhances team productivity, improves project transparency, and simplifies workflow management for small to medium teams.",
      features: {
        core: [
          "Task creation and assignment",
          "Due date tracking",
          "Project grouping",
          "Team member management",
          "Progress tracking",
          "Priority levels"
        ],
        extras: [
          "Time tracking",
          "Automated reminders",
          "Calendar integration",
          "Custom workflows",
          "File attachments",
          "Reporting dashboard"
        ]
      },
      timeline: {
        estimated_weeks: 8,
        phases: [
          {
            name: "Discovery & Planning",
            duration: "2 weeks",
            tasks: [
              "User research",
              "Competitor analysis",
              "Feature prioritization",
              "Technical requirements documentation",
              "Project roadmap creation"
            ]
          },
          {
            name: "Design & Prototyping",
            duration: "2 weeks",
            tasks: [
              "UI wireframes",
              "Interactive prototypes",
              "Design system development",
              "User testing",
              "Design iterations"
            ]
          },
          {
            name: "Development",
            duration: "3 weeks",
            tasks: [
              "Frontend implementation",
              "Backend API development",
              "Database schema setup",
              "Authentication system",
              "Core task management functions"
            ]
          },
          {
            name: "Testing & Launch",
            duration: "1 week",
            tasks: [
              "Quality assurance",
              "Performance testing",
              "User acceptance testing",
              "Documentation",
              "Deployment preparation"
            ]
          }
        ]
      },
      resources: [
        { id: '1', name: 'User Flow Documentation', type: 'document', url: '#' },
        { id: '2', name: 'Calendar Integration Docs', type: 'link', url: '#' },
        { id: '3', name: 'Backend Repository', type: 'code', url: '#' },
        { id: '4', name: 'Task Database Schema', type: 'database', url: '#' },
        { id: '5', name: 'UI Components Library', type: 'image', url: '#' }
      ]
    }
  },
  {
    id: "demo-3",
    title: "Health & Fitness Tracker",
    description: "A mobile application for tracking fitness goals, nutrition, and overall wellness metrics.",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: "active",
    user_id: "demo-user",
    details: {
      business_context: {
        industry: "Health & Wellness",
        companyName: "FitLife",
        scale: "Startup",
        target_audience: ["Fitness enthusiasts", "Health-conscious individuals", "Beginners starting fitness journey"]
      },
      goals: "Create an engaging mobile application that helps users establish and maintain healthy habits, track their fitness progress, and achieve personal wellness goals through insightful data and motivational features.",
      features: {
        core: [
          "Workout logging",
          "Exercise library with instructions",
          "Nutrition tracking",
          "Weight and body measurements",
          "Goal setting",
          "Progress visualization"
        ],
        extras: [
          "Social sharing and community",
          "Coach/trainer connection",
          "Wearable device integration",
          "Personalized workout plans",
          "Meal planning assistant",
          "Mindfulness and meditation sessions"
        ]
      },
      timeline: {
        estimated_weeks: 14,
        phases: [
          {
            name: "Research & Planning",
            duration: "2 weeks",
            tasks: [
              "Market research",
              "Target audience analysis",
              "Feature definition",
              "Technical stack selection",
              "Product roadmap creation"
            ]
          },
          {
            name: "UI/UX Design",
            duration: "3 weeks",
            tasks: [
              "User journey mapping",
              "Wireframing",
              "Visual design",
              "Interactive prototyping",
              "Usability testing"
            ]
          },
          {
            name: "Core Development",
            duration: "4 weeks",
            tasks: [
              "App architecture setup",
              "User authentication",
              "Database design",
              "Workout tracking implementation",
              "Nutrition tracking features"
            ]
          },
          {
            name: "Advanced Features",
            duration: "3 weeks",
            tasks: [
              "Progress visualization",
              "Goal setting functionality",
              "Exercise library implementation",
              "Analytics dashboard",
              "Health metrics integration"
            ]
          },
          {
            name: "Testing & Refinement",
            duration: "2 weeks",
            tasks: [
              "QA testing",
              "Performance optimization",
              "User feedback gathering",
              "Bug fixing",
              "Final polish and preparation for launch"
            ]
          }
        ]
      },
      resources: [
        { id: '1', name: 'Exercise Reference Guide', type: 'document', url: '#' },
        { id: '2', name: 'Nutrition API Documentation', type: 'link', url: '#' },
        { id: '3', name: 'Mobile App Repository', type: 'code', url: '#' },
        { id: '4', name: 'Health Metrics Schema', type: 'database', url: '#' },
        { id: '5', name: 'Workout Illustrations', type: 'image', url: '#' }
      ]
    }
  }
];
