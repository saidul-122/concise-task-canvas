
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/projects/NewProjectDialog";
import { ArrowUp, ArrowDown, Clock, CheckSquare, Plus } from "lucide-react";
import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { projects, getProjects, isLoading } = useProjects();
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [counts, setCounts] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0
  });

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    const fetchTaskStats = () => {
      // In a real app, we would fetch this data from an API
      // For now, we'll just simulate some data based on local storage
      
      const tasks = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks')!)
        : [];
      
      const total = tasks.length;
      const completed = tasks.filter((t: any) => t.status === 'done').length;
      const inProgress = tasks.filter((t: any) => t.status === 'in-progress').length;
      
      // Simulate some overdue tasks (in a real app this would be based on due dates)
      const overdue = Math.floor(Math.random() * 3);
      
      setCounts({
        total,
        completed,
        inProgress,
        overdue
      });
    };
    
    fetchTaskStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-gray-500">Here's an overview of your task progress</p>
        </div>
        <Button onClick={() => setIsProjectDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.total}</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.completed}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">
                {counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0}%
              </span>
              <span className="ml-1">completion rate</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              Tasks currently being worked on
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.overdue}</div>
            {counts.overdue > 0 ? (
              <p className="text-xs flex items-center text-red-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                Requires attention
              </p>
            ) : (
              <p className="text-xs flex items-center text-green-500">
                <ArrowDown className="mr-1 h-3 w-3" />
                No overdue tasks
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Projects</h2>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((project: Project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2">{project.description}</p>
                  <Button 
                    variant="link" 
                    className="px-0 mt-2"
                    onClick={() => window.location.href = `/projects/${project.id}/tasks`}
                  >
                    View Tasks →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-6 text-center">
              <p className="text-gray-500 mb-4">You haven't created any projects yet.</p>
              <Button onClick={() => setIsProjectDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <NewProjectDialog
        isOpen={isProjectDialogOpen}
        setIsOpen={setIsProjectDialogOpen}
      />
    </div>
  );
};

export default Dashboard;
