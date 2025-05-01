
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Project, ProjectContextType } from "@/types";
import { useAuth } from "./AuthContext";

// Create the project context
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Helper function to get projects from localStorage
const getProjectsFromStorage = (userId: string): Project[] => {
  const projects = localStorage.getItem('projects');
  if (projects) {
    const allProjects: Project[] = JSON.parse(projects);
    return allProjects.filter(project => project.userId === userId);
  }
  return [];
};

// Helper function to save projects to localStorage
const saveProjectsToStorage = (projects: Project[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load projects on mount and when user changes
  useEffect(() => {
    if (user) {
      const userProjects = getProjectsFromStorage(user.id);
      setProjects(userProjects);
    } else {
      setProjects([]);
    }
  }, [user]);

  // Get projects
  const getProjects = async (): Promise<Project[]> => {
    if (!user) {
      setError("You must be logged in to view projects");
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userProjects = getProjectsFromStorage(user.id);
      setProjects(userProjects);
      return userProjects;
    } catch (err) {
      setError("Failed to fetch projects");
      toast.error("Failed to fetch projects");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Create project
  const createProject = async (name: string, description: string): Promise<Project> => {
    if (!user) {
      throw new Error("You must be logged in to create a project");
    }

    // Check if user already has 4 projects
    const userProjects = getProjectsFromStorage(user.id);
    if (userProjects.length >= 4) {
      toast.error("You can only have up to 4 projects");
      throw new Error("Maximum number of projects reached (4)");
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const timestamp = new Date().toISOString();
      const newProject: Project = {
        id: `project-${Date.now()}`,
        name,
        description,
        userId: user.id,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      const allProjects = localStorage.getItem('projects') 
        ? JSON.parse(localStorage.getItem('projects')!) 
        : [];
      
      const updatedProjects = [...allProjects, newProject];
      saveProjectsToStorage(updatedProjects);
      
      // Update state
      setProjects(prev => [...prev, newProject]);
      
      toast.success("Project created successfully");
      return newProject;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create project";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id: string): Promise<void> => {
    if (!user) {
      throw new Error("You must be logged in to delete a project");
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allProjects = localStorage.getItem('projects') 
        ? JSON.parse(localStorage.getItem('projects')!) 
        : [];
      
      const updatedProjects = allProjects.filter((p: Project) => p.id !== id);
      saveProjectsToStorage(updatedProjects);
      
      // Update state
      setProjects(prev => prev.filter(p => p.id !== id));

      // Also delete all tasks associated with this project
      const tasks = localStorage.getItem('tasks') 
        ? JSON.parse(localStorage.getItem('tasks')!) 
        : [];
      
      const updatedTasks = tasks.filter((t: any) => t.projectId !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      
      toast.success("Project deleted successfully");
    } catch (err) {
      setError("Failed to delete project");
      toast.error("Failed to delete project");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update project
  const updateProject = async (id: string, name: string, description: string): Promise<Project> => {
    if (!user) {
      throw new Error("You must be logged in to update a project");
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allProjects = localStorage.getItem('projects') 
        ? JSON.parse(localStorage.getItem('projects')!) 
        : [];
      
      const projectIndex = allProjects.findIndex((p: Project) => p.id === id);
      
      if (projectIndex === -1) {
        throw new Error("Project not found");
      }
      
      const updatedProject = {
        ...allProjects[projectIndex],
        name,
        description,
        updatedAt: new Date().toISOString()
      };
      
      allProjects[projectIndex] = updatedProject;
      saveProjectsToStorage(allProjects);
      
      // Update state
      setProjects(prev => 
        prev.map(p => p.id === id ? updatedProject : p)
      );
      
      toast.success("Project updated successfully");
      return updatedProject;
    } catch (err) {
      setError("Failed to update project");
      toast.error("Failed to update project");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    projects,
    isLoading,
    error,
    createProject,
    getProjects,
    deleteProject,
    updateProject
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
