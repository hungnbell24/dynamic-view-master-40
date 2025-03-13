
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Clock, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

const TaskPage: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      completed: false,
      dueDate: '2023-12-15',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Review team performance',
      completed: false,
      dueDate: '2023-12-20',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Schedule client meeting',
      completed: true,
      dueDate: '2023-12-10',
      priority: 'medium',
    },
    {
      id: '4',
      title: 'Update documentation',
      completed: false,
      dueDate: '2023-12-30',
      priority: 'low',
    },
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'medium',
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    
    toast({
      title: "Task added",
      description: "New task has been added to your list",
    });
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list",
    });
  };

  const getStatusStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Task Management</h1>
        </div>

        <div className="dashboard-card p-4 animate-slide-up opacity-0">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="flex-grow"
            />
            <Button onClick={addTask} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="dashboard-card p-4 animate-slide-up opacity-0 animation-delay-100">
          <h2 className="text-lg font-semibold mb-4">Your Tasks</h2>
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-center text-dashboard-text-secondary py-4">No tasks found. Add a task to get started.</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="group">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-dashboard-card/70 transition-colors">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          task.completed
                            ? 'bg-dashboard-highlight text-white border-dashboard-highlight'
                            : 'border-dashboard-text-secondary'
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3" />}
                      </button>
                      
                      <div className="flex flex-col">
                        <span className={`${task.completed ? 'line-through text-dashboard-text-secondary' : 'text-dashboard-text'}`}>
                          {task.title}
                        </span>
                        {task.dueDate && (
                          <div className="flex items-center text-xs text-dashboard-text-secondary mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusStyle(task.priority)}`} />
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-dashboard-text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <Separator className="my-2" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up opacity-0 animation-delay-200">
          <div className="dashboard-card p-4">
            <h3 className="font-medium mb-2">Upcoming</h3>
            <p className="text-2xl font-bold text-dashboard-text">{tasks.filter(task => !task.completed).length}</p>
            <p className="text-dashboard-text-secondary text-sm">tasks remaining</p>
          </div>
          
          <div className="dashboard-card p-4">
            <h3 className="font-medium mb-2">Completed</h3>
            <p className="text-2xl font-bold text-dashboard-text">{tasks.filter(task => task.completed).length}</p>
            <p className="text-dashboard-text-secondary text-sm">tasks finished</p>
          </div>
          
          <div className="dashboard-card p-4">
            <h3 className="font-medium mb-2">Priority</h3>
            <p className="text-2xl font-bold text-dashboard-text">{tasks.filter(task => task.priority === 'high' && !task.completed).length}</p>
            <p className="text-dashboard-text-secondary text-sm">high priority tasks</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskPage;
