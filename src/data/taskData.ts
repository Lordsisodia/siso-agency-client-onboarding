
import { Task } from '@/types/task';

export const projectLifecycleTasks: Task[] = [
  {
    id: 'setup-1',
    title: 'Complete Plan Builder Information',
    description: 'Fill out all required information in the Plan Builder',
    dueDate: '2023-12-15',
    priority: 'high',
    status: 'pending',
    phase: 'setup',
    phaseOrder: 1,
    project: 'Project Lifecycle',
    tags: ['setup', 'planning']
  },
  {
    id: 'setup-2',
    title: 'Initial AI Consultation',
    description: 'Schedule and complete initial consultation with AI assistant',
    dueDate: '2023-12-16',
    priority: 'medium',
    status: 'pending',
    phase: 'setup',
    phaseOrder: 2,
    dependsOn: ['setup-1'],
    project: 'Project Lifecycle',
    tags: ['setup', 'consultation']
  },
  {
    id: 'setup-3',
    title: 'Submit Project Requirements',
    description: 'Finalize and submit all project requirements',
    dueDate: '2023-12-18',
    priority: 'high',
    status: 'pending',
    phase: 'setup',
    phaseOrder: 3,
    dependsOn: ['setup-2'],
    project: 'Project Lifecycle',
    tags: ['setup', 'requirements'],
    requiresApproval: true
  },
  
  {
    id: 'review-1',
    title: 'AI Review & Feedback',
    description: 'AI review of project requirements and initial feedback',
    dueDate: '2023-12-20',
    priority: 'high',
    status: 'pending',
    phase: 'review',
    phaseOrder: 1,
    dependsOn: ['setup-3'],
    project: 'Project Lifecycle',
    tags: ['review', 'feedback']
  },
  {
    id: 'review-2',
    title: 'Requirements Adjustment',
    description: 'Make adjustments to requirements based on AI feedback',
    dueDate: '2023-12-22',
    priority: 'medium',
    status: 'pending',
    phase: 'review',
    phaseOrder: 2,
    dependsOn: ['review-1'],
    project: 'Project Lifecycle',
    tags: ['review', 'adjustment']
  },
  {
    id: 'review-3',
    title: 'Final AI Approval',
    description: 'Get final approval from AI for project requirements',
    dueDate: '2023-12-24',
    priority: 'high',
    status: 'pending',
    phase: 'review',
    phaseOrder: 3,
    dependsOn: ['review-2'],
    project: 'Project Lifecycle',
    tags: ['review', 'approval'],
    requiresApproval: true
  },
  
  {
    id: 'initiation-1',
    title: 'Project Publication',
    description: 'Publish project to development team',
    dueDate: '2023-12-26',
    priority: 'high',
    status: 'pending',
    phase: 'initiation',
    phaseOrder: 1,
    dependsOn: ['review-3'],
    project: 'Project Lifecycle',
    tags: ['initiation', 'publication']
  },
  {
    id: 'initiation-2',
    title: 'Initial Deposit Payment',
    description: 'Process initial deposit payment',
    dueDate: '2023-12-28',
    priority: 'high',
    status: 'pending',
    phase: 'initiation',
    phaseOrder: 2,
    dependsOn: ['initiation-1'],
    project: 'Project Lifecycle',
    tags: ['initiation', 'payment']
  },
  {
    id: 'initiation-3',
    title: 'Schedule Onboarding Call',
    description: 'Schedule and prepare for onboarding call with client',
    dueDate: '2023-12-30',
    priority: 'medium',
    status: 'pending',
    phase: 'initiation',
    phaseOrder: 3,
    dependsOn: ['initiation-2'],
    project: 'Project Lifecycle',
    tags: ['initiation', 'onboarding']
  },
  
  {
    id: 'development-1',
    title: 'Onboarding Call Completion',
    description: 'Complete onboarding call and document action items',
    dueDate: '2024-01-02',
    priority: 'high',
    status: 'pending',
    phase: 'development',
    phaseOrder: 1,
    dependsOn: ['initiation-3'],
    project: 'Project Lifecycle',
    tags: ['development', 'onboarding']
  },
  {
    id: 'development-2',
    title: 'Feature Review',
    description: 'Review all features to be implemented',
    dueDate: '2024-01-04',
    priority: 'medium',
    status: 'pending',
    phase: 'development',
    phaseOrder: 2,
    dependsOn: ['development-1'],
    project: 'Project Lifecycle',
    tags: ['development', 'review']
  },
  {
    id: 'development-3',
    title: 'Implementation Changes',
    description: 'Make necessary changes to implementation plan',
    dueDate: '2024-01-06',
    priority: 'high',
    status: 'pending',
    phase: 'development',
    phaseOrder: 3,
    dependsOn: ['development-2'],
    project: 'Project Lifecycle',
    tags: ['development', 'implementation']
  },
  
  {
    id: 'completion-1',
    title: 'Final Review',
    description: 'Conduct final review of all deliverables',
    dueDate: '2024-01-08',
    priority: 'high',
    status: 'pending',
    phase: 'completion',
    phaseOrder: 1,
    dependsOn: ['development-3'],
    project: 'Project Lifecycle',
    tags: ['completion', 'review']
  },
  {
    id: 'completion-2',
    title: 'Final Payment',
    description: 'Process final payment for project completion',
    dueDate: '2024-01-10',
    priority: 'high',
    status: 'pending',
    phase: 'completion',
    phaseOrder: 2,
    dependsOn: ['completion-1'],
    project: 'Project Lifecycle',
    tags: ['completion', 'payment']
  },
  {
    id: 'completion-3',
    title: 'Project Delivery',
    description: 'Deliver final project assets and documentation',
    dueDate: '2024-01-12',
    priority: 'high',
    status: 'pending',
    phase: 'completion',
    phaseOrder: 3,
    dependsOn: ['completion-2'],
    project: 'Project Lifecycle',
    tags: ['completion', 'delivery'],
    requiresApproval: true
  }
];

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'File initial court documents',
    description: 'Submit the necessary paperwork to initiate legal proceedings',
    dueDate: '2023-12-15',
    priority: 'high',
    status: 'pending',
    category: 'court-action',
    project: 'Legal Case #4587',
    tags: ['legal', 'deadline']
  },
  {
    id: '2',
    title: 'Send client engagement email',
    description: 'Contact new client with welcome package and initial steps',
    dueDate: '2023-12-16',
    priority: 'medium',
    status: 'in-progress',
    category: 'cta-action',
    project: 'Client Onboarding',
    tags: ['communication', 'onboarding']
  },
  {
    id: '3',
    title: 'Prepare case documentation',
    description: 'Organize all relevant documents for the upcoming case',
    dueDate: '2023-12-18',
    priority: 'high',
    status: 'pending',
    category: 'documentation',
    project: 'Legal Case #4587',
    dependsOn: ['1'],
    tags: ['legal', 'preparation']
  },
  {
    id: '4',
    title: 'Schedule client meeting',
    description: 'Arrange follow-up discussion with client about case progress',
    dueDate: '2023-12-20',
    priority: 'medium',
    status: 'pending',
    category: 'general',
    project: 'Client Management',
    dependsOn: ['2'],
    tags: ['meeting', 'client']
  },
  {
    id: '5',
    title: 'Court appearance preparation',
    description: 'Review case materials and prepare arguments for court',
    dueDate: '2023-12-22',
    priority: 'high',
    status: 'pending',
    category: 'court-action',
    project: 'Legal Case #4587',
    dependsOn: ['3'],
    tags: ['legal', 'preparation']
  },
  {
    id: '6',
    title: 'Submit case evidence',
    description: 'File all supporting evidence with the court clerk',
    dueDate: '2023-12-19',
    priority: 'high',
    status: 'pending',
    category: 'documentation',
    project: 'Legal Case #4587',
    dependsOn: ['1', '3'],
    tags: ['legal', 'evidence']
  },
  {
    id: '7',
    title: 'Send follow-up emails',
    description: 'Contact all clients with status updates',
    dueDate: '2023-12-21',
    priority: 'low',
    status: 'pending',
    category: 'cta-action',
    project: 'Client Management',
    tags: ['communication', 'follow-up']
  },
  {
    id: '8',
    title: 'Review case law precedents',
    description: 'Research similar cases for legal arguments',
    dueDate: '2023-12-17',
    priority: 'medium',
    status: 'completed',
    completedDate: '2023-12-14',
    category: 'documentation',
    project: 'Legal Research',
    tags: ['research', 'legal']
  }
];
