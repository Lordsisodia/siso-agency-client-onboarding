
export interface ProjectTypeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  timelineSmall: string;
  timelineMedium: string; 
  timelineLarge: string;
}

// Sample project types data
export const projectTypes: ProjectTypeInfo[] = [
  {
    id: 'website',
    name: 'Website',
    description: 'Create an informational website to showcase your brand, products, or services.',
    icon: 'Globe',
    features: [
      'Responsive design for all devices',
      'Contact forms and integrations',
      'Content management system',
      'SEO optimization',
      'Analytics integration',
      'Performance optimization',
      'Multiple language support',
      'Advanced animations and interactions'
    ],
    timelineSmall: '2-4 weeks',
    timelineMedium: '4-8 weeks',
    timelineLarge: '8-12 weeks'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Build an online store to sell products or services with secure payment processing.',
    icon: 'ShoppingCart',
    features: [
      'Product catalog management',
      'Shopping cart functionality',
      'Secure payment processing',
      'Inventory management',
      'Order tracking system',
      'Customer account management',
      'Promotions and discount system',
      'Multiple shipping options'
    ],
    timelineSmall: '4-6 weeks',
    timelineMedium: '8-12 weeks',
    timelineLarge: '12-16 weeks'
  },
  {
    id: 'webapp',
    name: 'Web Application',
    description: 'Develop a feature-rich application with user authentication and advanced functionality.',
    icon: 'Layout',
    features: [
      'User authentication system',
      'Dashboard interfaces',
      'Data visualization',
      'User permissions and roles',
      'Real-time updates',
      'Offline capabilities',
      'Integration with third-party services',
      'Comprehensive testing coverage'
    ],
    timelineSmall: '6-8 weeks',
    timelineMedium: '10-14 weeks',
    timelineLarge: '16-24 weeks'
  },
  {
    id: 'portal',
    name: 'Customer Portal',
    description: 'Create a secure portal for customer account management and service delivery.',
    icon: 'Users',
    features: [
      'Secure login system',
      'Profile management',
      'Document storage and sharing',
      'Communication tools',
      'Service request system',
      'Billing and payment management',
      'Appointment scheduling',
      'Reporting and analytics'
    ],
    timelineSmall: '4-8 weeks',
    timelineMedium: '8-12 weeks',
    timelineLarge: '12-20 weeks'
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'Design and develop a native or cross-platform mobile application.',
    icon: 'Smartphone',
    features: [
      'Cross-platform compatibility',
      'Responsive UI for different device sizes',
      'Push notifications',
      'Offline capabilities',
      'Device feature integration',
      'App store optimization',
      'Analytics and crash reporting',
      'Continuous integration and deployment'
    ],
    timelineSmall: '6-10 weeks',
    timelineMedium: '10-16 weeks',
    timelineLarge: '16-24 weeks'
  }
];
