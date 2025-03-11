
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}

const PendingTasks = () => {
  // Sample data - in a real app, this would come from an API
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Complete project requirements document',
      description: 'Finalize the requirements document for the new dashboard feature',
      dueDate: '2023-10-15',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Review design mockups',
      description: 'Review and provide feedback on the new design mockups',
      dueDate: '2023-10-18',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Schedule client meeting',
      description: 'Set up a meeting with the client to discuss project progress',
      dueDate: '2023-10-20',
      priority: 'low',
      status: 'pending'
    }
  ];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'pending':
        return <Circle className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold">Pending Tasks</h1>
          <div className="mb-6 flex justify-between">
            <div>
              <p className="text-gray-500">Manage your pending tasks and track progress</p>
            </div>
            <Button>Create New Task</Button>
          </div>

          <div className="grid gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between bg-gray-50 pb-2 pt-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                  </div>
                  <div className={`font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription className="mb-4">{task.description}</CardDescription>
                  <div className="flex justify-between text-sm">
                    <div className="text-gray-500">
                      <span className="font-semibold">Due Date:</span> {task.dueDate}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="default" size="sm">Complete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
