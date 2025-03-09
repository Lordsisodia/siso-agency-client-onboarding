
export interface FeatureOption {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const featureOptions: FeatureOption[] = [
  {
    id: "auth",
    name: "User Authentication",
    description: "User registration, login, and profile management",
    category: "Users & Authentication"
  },
  {
    id: "roles",
    name: "User Roles & Permissions",
    description: "Different access levels and permissions for users",
    category: "Users & Authentication"
  },
  {
    id: "payments",
    name: "Payment Processing",
    description: "Ability to accept payments and manage transactions",
    category: "E-commerce"
  },
  {
    id: "cart",
    name: "Shopping Cart",
    description: "Allow users to add items and checkout",
    category: "E-commerce"
  },
  {
    id: "inventory",
    name: "Inventory Management",
    description: "Track and manage product inventory",
    category: "E-commerce"
  },
  {
    id: "search",
    name: "Search Functionality",
    description: "Allow users to search content within the app",
    category: "Content"
  },
  {
    id: "notifications",
    name: "Notifications",
    description: "Send alerts and notifications to users",
    category: "Communication"
  },
  {
    id: "messaging",
    name: "Messaging/Chat",
    description: "Allow users to communicate with each other",
    category: "Communication"
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Track and visualize user activity and business metrics",
    category: "Admin"
  },
  {
    id: "admin",
    name: "Admin Portal",
    description: "Backend interface for managing the application",
    category: "Admin"
  },
  {
    id: "file-upload",
    name: "File Upload & Storage",
    description: "Allow users to upload and store files",
    category: "Content"
  },
  {
    id: "social",
    name: "Social Media Integration",
    description: "Connect with social platforms for sharing or login",
    category: "Integration"
  },
  {
    id: "mobile",
    name: "Mobile App Version",
    description: "Native mobile application for iOS/Android",
    category: "Platform"
  },
  {
    id: "offline",
    name: "Offline Functionality",
    description: "App works without internet connection",
    category: "Technical"
  },
  {
    id: "ai",
    name: "AI/ML Features",
    description: "Smart features powered by artificial intelligence",
    category: "Technical"
  },
  {
    id: "reports",
    name: "Reporting & Exports",
    description: "Generate reports and export data",
    category: "Content"
  }
];
