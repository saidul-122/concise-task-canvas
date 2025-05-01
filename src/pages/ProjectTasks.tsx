
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/contexts/TaskContext";
import { useProjects } from "@/contexts/ProjectContext";
import TaskList from "@/components/tasks/TaskList";
import NewTaskDialog from "@/components/tasks/NewTaskDialog";
import { Plus, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task, TaskStatus } from "@/types";
import StatusBadge from "@/components/StatusBadge";

const statusOrder: TaskStatus[] = ["todo", "in-progress", "review", "done"];

const ProjectTasks: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { tasks, getTasks, isLoading } = useTasks();
  const { projects, getProjects } = useProjects();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | TaskStatus>("all");
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (projectId) {
      getTasks(projectId);
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    const allProjects = await getProjects();
    const currentProject = allProjects.find(p => p.id === projectId);
    setProject(currentProject);
  };

  const refreshTasks = () => {
    if (projectId) {
      getTasks(projectId);
    }
  };

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === "all") return true;
    return task.status === activeTab;
  });

  // Sort tasks with statusOrder
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aIndex = statusOrder.indexOf(a.status);
    const bIndex = statusOrder.indexOf(b.status);
    return aIndex - bIndex;
  });

  // Count tasks by status
  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    review: tasks.filter(t => t.status === "review").length,
    done: tasks.filter(t => t.status === "done").length,
  };

  if (!projectId) {
    return <div>Project ID is required</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button 
            variant="ghost" 
            className="mb-2 -ml-3 flex items-center text-gray-500 hover:text-gray-800"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Projects
          </Button>
          
          <h1 className="text-2xl font-bold">{project?.name || 'Loading...'}</h1>
          {project && <p className="text-gray-500">{project.description}</p>}
        </div>
        <Button onClick={() => setIsTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All Tasks <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{taskCounts.all}</span>
          </TabsTrigger>
          <TabsTrigger value="todo">
            <span className="flex items-center">
              To Do <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{taskCounts.todo}</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            <span className="flex items-center">
              In Progress <span className="ml-2 bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-xs">{taskCounts["in-progress"]}</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="review">
            <span className="flex items-center">
              In Review <span className="ml-2 bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs">{taskCounts.review}</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="done">
            <span className="flex items-center">
              Done <span className="ml-2 bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs">{taskCounts.done}</span>
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <TaskList
              tasks={sortedTasks}
              projectId={projectId}
              onRefresh={refreshTasks}
            />
          )}
        </TabsContent>
      </Tabs>

      <NewTaskDialog
        projectId={projectId}
        isOpen={isTaskDialogOpen}
        setIsOpen={(open) => {
          setIsTaskDialogOpen(open);
          if (!open) {
            refreshTasks();
          }
        }}
      />
    </div>
  );
};

export default ProjectTasks;
