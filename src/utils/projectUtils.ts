
import { TaskProject } from '@/types/task';
import { Project } from '@/components/project-details/types';

// Convert a database Project to a TaskProject for UI components
export const convertToTaskProject = (project: Project): TaskProject => {
  // Define default phases if the project doesn't have a timeline
  const defaultPhases = [
    { name: 'Planning', status: 'completed' as const, progress: 100 },
    { name: 'Design', status: 'completed' as const, progress: 100 },
    { name: 'Development', status: 'in-progress' as const, progress: 60 },
    { name: 'Testing', status: 'pending' as const, progress: 0 },
    { name: 'Deployment', status: 'pending' as const, progress: 0 }
  ];
  
  // Extract phases from project timeline if available
  const phases = project.details?.timeline?.phases 
    ? project.details.timeline.phases.map((phase, index) => {
        // Calculate progress based on position in timeline
        // Early phases are more likely to be completed or in progress
        let progress = 0;
        let status: 'completed' | 'in-progress' | 'pending' = 'pending';
        
        if (index === 0) {
          progress = 100;
          status = 'completed';
        } else if (index === 1) {
          progress = 100;
          status = 'completed';
        } else if (index === 2) {
          progress = 60;
          status = 'in-progress';
        } else {
          progress = 0;
          status = 'pending';
        }
        
        return {
          name: phase.name,
          status,
          progress
        };
      })
    : defaultPhases;
  
  // Calculate a deadline based on creation date if not available
  const creationDate = new Date(project.created_at);
  const deadlineDate = new Date(creationDate);
  deadlineDate.setDate(deadlineDate.getDate() + 90); // Default 90 days project
  
  // Extract basic features for tags
  const tags = project.details?.features?.core?.slice(0, 3) || [];
  
  // Create mock financial data for visualization
  const financials = {
    marketValue: 50000,
    costSavings: 15000,
    developmentCost: 25000,
    roi: 160
  };
  
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    status: project.status,
    deadline: deadlineDate.toISOString(),
    phases,
    tags,
    financials
  };
};

// Get project status display class
export const getProjectStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'completed':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'on-hold':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'cancelled':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  }
};

// Format deadline or due date with relative indicators
export const formatProjectDeadline = (dateString: string): { text: string, isOverdue: boolean } => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { 
      text: `Overdue by ${Math.abs(diffDays)} days`, 
      isOverdue: true 
    };
  } else if (diffDays === 0) {
    return { 
      text: 'Due today', 
      isOverdue: false 
    };
  } else if (diffDays === 1) {
    return { 
      text: 'Due tomorrow', 
      isOverdue: false 
    };
  } else if (diffDays <= 7) {
    return { 
      text: `Due in ${diffDays} days`, 
      isOverdue: false 
    };
  } else {
    return { 
      text: `Due on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, 
      isOverdue: false 
    };
  }
};
