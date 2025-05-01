
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/ProjectContext";
import { Project, Task } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import TaskList from "@/components/tasks/TaskList";
import NewTaskDialog from "@/components/tasks/NewTaskDialog";
import { Plus } from "lucide-react";

const AllTasks: React.FC = () => {
  const { projects, getProjects } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const projectList = await getProjects();
      if (projectList.length > 0) {
        setSelectedProjectId(projectList[0].id);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchTasks();
    }
  }, [selectedProjectId]);

  const fetchTasks = async () => {
    setIsLoading(true);
    // In a real app, we would fetch this from an API
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const allTasks: Task[] = JSON.parse(storedTasks);
      setTasks(allTasks.filter(task => task.projectId === selectedProjectId));
    } else {
      setTasks([]);
    }
    setIsLoading(false);
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const currentProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">All Tasks</h1>
          <p className="text-gray-500">Manage tasks across all your projects</p>
        </div>
        
        {selectedProjectId && (
          <Button onClick={() => setIsTaskDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        )}
      </div>

      {projects.length > 0 ? (
        <div className="space-y-6">
          <div className="w-full max-w-xs">
            <Label htmlFor="project">Select Project</Label>
            <Select 
              value={selectedProjectId} 
              onValueChange={handleProjectChange}
            >
              <SelectTrigger id="project">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project: Project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedProjectId ? (
            isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{currentProject?.name} Tasks</h2>
                <TaskList 
                  tasks={tasks}
                  projectId={selectedProjectId}
                  onRefresh={fetchTasks}
                />
              </>
            )
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Select a project to view its tasks</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-6">Create a project first to manage tasks</p>
          <Button onClick={() => window.location.href = "/projects"}>
            Go to Projects
          </Button>
        </div>
      )}

      {selectedProjectId && (
        <NewTaskDialog
          projectId={selectedProjectId}
          isOpen={isTaskDialogOpen}
          setIsOpen={(open) => {
            setIsTaskDialogOpen(open);
            if (!open) {
              fetchTasks();
            }
          }}
        />
      )}
    </div>
  );
};

export default AllTasks;
