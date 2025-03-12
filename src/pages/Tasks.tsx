import React, { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Filter, 
  Plus, 
  ClipboardList,
  Calendar as CalendarIcon,
  ChevronRight,
  Package,
  CheckSquare,
  ThumbsUp,
  Rocket,
  Play,
  Code,
  Settings,
  FlagCheckered,
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

type TaskStatus = 'pending' | 'in-progress' | 'completed';
type TaskPhase = 'setup' | 'review' | 'initiation' | 'development' | 'completion';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
  phase: TaskPhase;
  phaseOrder: number;
  completedDate?: string;
  dependsOn?: string[];
  assignedTo?: string;
  project?: string;
  tags?: string[];
  requiresApproval?: boolean;
  approvedBy?: string;
  approvedAt?: string;
};

const phaseConfig = {
  'setup': {
    icon: <Package className="w-4 h-4" />,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    title: 'Project Setup',
    description: 'Initial project setup and requirements gathering'
  },
  'review': {
    icon: <CheckSquare className="w-4 h-4" />,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    title: 'Review & Approval',
    description: 'Review and approval of project requirements'
  },
  'initiation': {
    icon: <Rocket className="w-4 h-4" />,
    color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
    title: 'Project Initiation',
    description: 'Initiate the project and begin onboarding'
  },
  'development': {
    icon: <Code className="w-4 h-4" />,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    title: 'Development',
    description: 'Project development and implementation'
  },
  'completion': {
    icon: <FlagCheckered className="w-4 h-4" />,
    color: 'text-green-500 bg-green-500/10 border-green-500/20',
    title: 'Completion',
    description: 'Final review and project delivery'
  }
};

const projectLifecycleTasks: Task[] = [
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

const sampleTasks: Task[] = [
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

const sortTasksChronologically = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};

const sortTasksByPhase = (tasks: Task[]): Task[] => {
  const phaseOrder = { 'setup': 1, 'review': 2, 'initiation': 3, 'development': 4, 'completion': 5 };
  return [...tasks].sort((a, b) => {
    const phaseDiff = phaseOrder[a.phase] - phaseOrder[b.phase];
    if (phaseDiff !== 0) return phaseDiff;
    
    return a.phaseOrder - b.phaseOrder;
  });
};

const canCompleteTask = (task: Task, allTasks: Task[]): boolean => {
  if (!task.dependsOn || task.dependsOn.length === 0) return true;
  
  return task.dependsOn.every(depId => {
    const dependentTask = allTasks.find(t => t.id === depId);
    return dependentTask?.status === 'completed';
  });
};

const statusIcons = {
  'pending': <Clock className="w-4 h-4 text-amber-500" />,
  'in-progress': <AlertCircle className="w-4 h-4 text-blue-500" />,
  'completed': <CheckCircle className="w-4 h-4 text-green-500" />
};

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  high: 'bg-red-500/10 text-red-500 border-red-500/20'
};

const TaskCard = ({ 
  task, 
  allTasks, 
  onUpdateStatus 
}: { 
  task: Task; 
  allTasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}) => {
  const phaseInfo = phaseConfig[task.phase] || {
    icon: <ClipboardList className="w-4 h-4" />,
    color: 'text-slate-400 bg-slate-400/10 border-slate-400/20'
  };

  const isCompletable = canCompleteTask(task, allTasks);

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return format(date, 'MMM d, yyyy');
  };

  const handleStatusChange = () => {
    if (task.status === 'completed') return;
    
    if (task.status === 'pending' && isCompletable) {
      onUpdateStatus(task.id, 'in-progress');
    } else if (task.status === 'in-progress') {
      onUpdateStatus(task.id, 'completed');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-xl border ${task.status === 'completed' ? 'border-green-500/30 bg-green-500/5' : 'border-slate-800/60 bg-black/20'} backdrop-blur-sm shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${phaseInfo.color}`}>
            {phaseInfo.icon}
          </span>
          <h3 className={`font-semibold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-100'}`}>{task.title}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <p className={`text-sm text-slate-300/80 mb-3 ml-10 ${task.status === 'completed' ? 'text-slate-500/80 line-through' : ''}`}>{task.description}</p>
      
      <div className="flex items-center gap-2 mb-3 ml-10">
        <div className="flex items-center text-xs bg-black/30 px-2 py-1 rounded-md text-slate-300/70">
          <CalendarIcon className="w-3 h-3 mr-1" />
          {formatDueDate(task.dueDate)}
        </div>
        {task.project && (
          <div className="text-xs bg-siso-orange/10 text-siso-orange px-2 py-1 rounded-md">
            {task.project}
          </div>
        )}
        {task.requiresApproval && (
          <div className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded-md flex items-center">
            <ThumbsUp className="w-3 h-3 mr-1" />
            Approval Required
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center ml-10">
        <div className="flex gap-1">
          {task.tags?.map((tag, index) => (
            <span key={index} className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300/60">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 ${!isCompletable && task.status !== 'completed' ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleStatusChange}
            disabled={!isCompletable && task.status !== 'completed'}
          >
            {statusIcons[task.status]}
            <span className="text-xs capitalize ml-1">{task.status.replace('-', ' ')}</span>
          </Button>
        </div>
      </div>
      
      {task.dependsOn && task.dependsOn.length > 0 && (
        <div className="mt-3 pt-2 border-t border-slate-800/50 text-xs text-slate-400 ml-10">
          <div className="flex items-center">
            <span>Dependencies: </span>
            <div className="flex gap-1 ml-1">
              {task.dependsOn.map((depId) => {
                const depTask = allTasks.find(t => t.id === depId);
                return (
                  <Badge 
                    key={depId} 
                    variant="outline" 
                    className={`text-xs ${depTask?.status === 'completed' ? 'line-through text-green-500' : 'text-amber-500'}`}
                  >
                    {depTask?.title.substring(0, 20)}
                    {depTask?.title.length > 20 ? '...' : ''}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const PhaseGroup = ({
  phase,
  tasks,
  allTasks,
  onUpdateStatus
}: {
  phase: TaskPhase;
  tasks: Task[];
  allTasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}) => {
  const phaseInfo = phaseConfig[phase];
  const tasksInPhase = tasks.filter(task => task.phase === phase);
  const totalTasks = tasksInPhase.length;
  const completedTasks = tasksInPhase.filter(task => task.status === 'completed').length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  if (tasksInPhase.length === 0) return null;
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${phaseInfo.color}`}>
          {phaseInfo.icon}
        </div>
        <div>
          <h3 className="font-bold text-lg">{phaseInfo.title}</h3>
          <p className="text-sm text-slate-400">{phaseInfo.description}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Phase Progress</span>
          <span className="text-sm">{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-slate-800/50" 
          indicatorClassName={`bg-gradient-to-r ${
            phase === 'setup' ? 'from-blue-500 to-blue-400' :
            phase === 'review' ? 'from-purple-500 to-purple-400' :
            phase === 'initiation' ? 'from-pink-500 to-pink-400' :
            phase === 'development' ? 'from-amber-500 to-amber-400' :
            'from-green-500 to-green-400'
          }`} 
        />
      </div>
      
      <div className="space-y-4 pl-4 border-l-2 border-slate-800/50">
        {tasksInPhase.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            allTasks={allTasks} 
            onUpdateStatus={onUpdateStatus} 
          />
        ))}
      </div>
    </div>
  );
};

const TaskLifecycle = ({ 
  tasks, 
  onUpdateStatus 
}: { 
  tasks: Task[]; 
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void; 
}) => {
  const phaseSortedTasks = sortTasksByPhase(tasks);
  
  const totalTasks = phaseSortedTasks.length;
  const completedTasks = phaseSortedTasks.filter(task => task.status === 'completed').length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  return (
    <div className="space-y-2">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Overall Progress</h3>
          <span className="text-sm">{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-slate-800/50" 
          indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange" 
        />
      </div>
      
      <PhaseGroup phase="setup" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
      <PhaseGroup phase="review" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
      <PhaseGroup phase="initiation" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
      <PhaseGroup phase="development" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
      <PhaseGroup phase="completion" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
    </div>
  );
};

const TaskTimeline = ({ 
  tasks, 
  onUpdateStatus 
}: { 
  tasks: Task[]; 
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void; 
}) => {
  const chronologicalTasks = sortTasksChronologically(tasks);
  
  const totalTasks = chronologicalTasks.length;
  const completedTasks = chronologicalTasks.filter(task => task.status === 'completed').length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  return (
    <div className="space-y-2">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Overall Progress</h3>
          <span className="text-sm">{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-slate-800/50" 
          indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange" 
        />
      </div>
      
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800/70" />
        
        {chronologicalTasks.map((task, index) => (
          <div key={task.id} className="mb-4 relative">
            <div className={`absolute left-4 top-6 w-3 h-3 rounded-full transform -translate-x-1.5 z-10 
              ${task.status === 'completed' 
                ? 'bg-green-500' 
                : task.status === 'in-progress' 
                  ? 'bg-blue-500' 
                  : 'bg-slate-700'}`} 
            />
            
            {index < chronologicalTasks.length - 1 && (
              <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-slate-800/70 transform -translate-x-1/2" />
            )}
            
            <div className="pl-10 pr-4">
              <div className="text-xs text-slate-400 mb-1">
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </div>
              <TaskCard task={task} allTasks={chronologicalTasks} onUpdateStatus={onUpdateStatus} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState([...projectLifecycleTasks, ...sampleTasks]);
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && task.status === 'pending';
    if (activeTab === 'in-progress') return matchesSearch && task.status === 'in-progress';
    if (activeTab === 'completed') return matchesSearch && task.status === 'completed';
    if (activeTab === 'setup') return matchesSearch && task.phase === 'setup';
    if (activeTab === 'review') return matchesSearch && task.phase === 'review';
    if (activeTab === 'initiation') return matchesSearch && task.phase === 'initiation';
    if (activeTab === 'development') return matchesSearch && task.phase === 'development';
    if (activeTab === 'completion') return matchesSearch && task.phase === 'completion';
    
    return matchesSearch;
  });

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: newStatus,
              completedDate: newStatus === 'completed' ? new Date().toISOString() : task.completedDate
            } 
          : task
      )
    );
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="relative z-10 container px-4 py-8 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold">Project Lifecycle Tasks</h1>
            <p className="mt-2 text-muted-foreground">
              Track your project progress through each phase of the lifecycle. Complete tasks sequentially to move your project forward.
            </p>
          </motion.div>
          
          <Card className="mb-8 bg-black/20 backdrop-blur-sm border-slate-800/60">
            <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="pl-10 bg-black/30 border-slate-700/50 w-full"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              <Button className="bg-siso-orange hover:bg-siso-orange/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/30 border border-slate-800/50 p-1 flex flex-wrap">
              <TabsTrigger value="all" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                All Tasks
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-500">
                Pending
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500">
                In Progress
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
                Completed
              </TabsTrigger>
              
              <TabsTrigger value="setup" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500">
                <Package className="h-4 w-4 mr-1" /> Setup
              </TabsTrigger>
              <TabsTrigger value="review" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500">
                <CheckSquare className="h-4 w-4 mr-1" /> Review
              </TabsTrigger>
              <TabsTrigger value="initiation" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-500">
                <Rocket className="h-4 w-4 mr-1" /> Initiation
              </TabsTrigger>
              <TabsTrigger value="development" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-500">
                <Code className="h-4 w-4 mr-1" /> Development
              </TabsTrigger>
              <TabsTrigger value="completion" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
                <FlagCheckered className="h-4 w-4 mr-1" /> Completion
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {filteredTasks.length > 0 ? (
                <TaskLifecycle tasks={filteredTasks} onUpdateStatus={handleUpdateTaskStatus} />
              ) : (
                <div className="py-16 text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 rounded-xl border border-slate-800/60 bg-black/20 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria or create a new task.</p>
                  </motion.div>
                </div>
              )}
            </TabsContent>
            
            {['pending', 'in-progress', 'completed', 'setup', 'review', 'initiation', 'development', 'completion'].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-6">
                {filteredTasks.length > 0 ? (
                  <TaskLifecycle tasks={filteredTasks} onUpdateStatus={handleUpdateTaskStatus} />
                ) : (
                  <div className="py-16 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 rounded-xl border border-slate-800/60 bg-black/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-semibold mb-2">No {tabValue.replace('-', ' ')} tasks</h3>
                      <p className="text-muted-foreground">
                        {tabValue === 'completed' 
                          ? 'You haven\'t completed any tasks yet.' 
                          : `You don't have any ${tabValue.replace('-', ' ')} tasks. Create one to get started.`}
                      </p>
                    </motion.div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
