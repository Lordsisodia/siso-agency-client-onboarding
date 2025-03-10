
export interface ProjectTypeInfo {
  id: string;
  name: string;
  description: string;
  icon?: string;
  keyFeatures?: string[];
  timeline?: string;
  bestFor?: string;
}

export const projectTypes: ProjectTypeInfo[] = [
  {
    id: 'website',
    name: 'Website',
    description: 'A standard website for presenting information, typically with multiple pages including home, about, services, contact, etc.',
    icon: 'internet',
    keyFeatures: [
      'Multiple content pages',
      'Contact forms',
      'Responsive design',
      'SEO optimization',
      'Image galleries'
    ],
    timeline: 'Typically 2-6 weeks depending on complexity and content',
    bestFor: 'Businesses looking to establish an online presence or showcase their products/services'
  },
  {
    id: 'webapp',
    name: 'Web Application',
    description: 'Interactive applications with user accounts, data persistence, and complex functionality.',
    icon: 'application',
    keyFeatures: [
      'User authentication',
      'Database integration',
      'Interactive UI components',
      'Data processing',
      'API integrations'
    ],
    timeline: 'Usually 1-6 months depending on complexity',
    bestFor: 'Businesses needing custom software solutions or interactive platforms'
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'Native or cross-platform applications for iOS and/or Android devices.',
    icon: 'mobile',
    keyFeatures: [
      'Platform-specific UI',
      'Push notifications',
      'Offline functionality',
      'App store deployment',
      'Device feature access'
    ],
    timeline: '2-8 months for initial release',
    bestFor: 'Companies looking to engage customers on mobile devices or provide specialized mobile tools'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online stores with product catalogs, shopping carts, and payment processing.',
    icon: 'shop',
    keyFeatures: [
      'Product catalog',
      'Shopping cart',
      'Secure checkout',
      'Payment gateway integration',
      'Order management'
    ],
    timeline: '1-4 months depending on catalog size and features',
    bestFor: 'Retail businesses or anyone looking to sell products online'
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Data visualization interfaces with charts, tables, and analytics.',
    icon: 'chart',
    keyFeatures: [
      'Interactive charts',
      'Data filtering',
      'Real-time updates',
      'Export functionality',
      'Data analysis tools'
    ],
    timeline: '1-3 months depending on data complexity',
    bestFor: 'Businesses needing to visualize and analyze data, or provide analytics to their customers'
  },
  {
    id: 'crm',
    name: 'CRM System',
    description: 'Customer relationship management systems to track leads, deals, and customer interactions.',
    icon: 'users',
    keyFeatures: [
      'Contact management',
      'Deal tracking',
      'Task and reminder system',
      'Reporting',
      'Email integration'
    ],
    timeline: '2-6 months for full implementation',
    bestFor: 'Sales teams and businesses that need to manage customer relationships efficiently'
  }
];
