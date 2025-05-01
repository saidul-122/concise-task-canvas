
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { Task, TaskStatus, TaskContextType } from "@/types";
import { useAuth } from "./AuthContext";

// Create the task context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Helper function to get tasks from localStorage
const getTasksFromStorage = (projectId?: string): Task[] => {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    const allTasks: Task[] = JSON.parse(tasks);
    return projectId ? allTasks.filter(task => task.projectId === projectId) : allTasks;
  }
  return [];
};

// Helper function to save tasks to localStorage
const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get tasks for a project
  const getTasks = async (projectId: string): Promise<Task[]> => {
    if (!user) {
      setError("You must be logged in to view tasks");
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const projectTasks = getTasksFromStorage(projectId);
      setTasks(projectTasks);
      return projectTasks;
    } catch (err) {
      setError("Failed to fetch tasks");
      toast.error("Failed to fetch tasks");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Create task
  const createTask = async (data: { title: string; description: string; projectId: string; status: TaskStatus }): Promise<Task> => {
    if (!user) {
      throw new Error("You must be logged in to create a task");
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const timestamp = new Date().toISOString();
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: data.title,
        description: data.description,
        status: data.status,
        projectId: data.projectId,
        createdAt: timestamp,
        completedAt: null,
        updatedAt: timestamp
      };

      const allTasks = getTasksFromStorage();
      const updatedTasks = [...allTasks, newTask];
      saveTasksToStorage(updatedTasks);
      
      // Update state
      setTasks(prev => [...prev, newTask]);
      
      toast.success("Task created successfully");
      return newTask;
    } catch (err) {
      setError("Failed to create task");
      toast.error("Failed to create task");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id: string): Promise<void> => {
    if (!user) {
      throw new Error("You must be logged in to delete a task");
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allTasks = getTasksFromStorage();
      const updatedTasks = allTasks.filter(t => t.id !== id);
      saveTasksToStorage(updatedTasks);
      
      // Update state
      setTasks(prev => prev.filter(t => t.id !== id));
      
      toast.success("Task deleted successfully");
    } catch (err) {
      setError("Failed to delete task");
      toast.error("Failed to delete task");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update task
  const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
    if (!user) {
      throw new Error("You must be logged in to update a task");
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allTasks = getTasksFromStorage();
      const taskIndex = allTasks.findIndex(t => t.id === id);
      
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }
      
      // Check if status is being updated to 'done'
      const isCompletingTask = data.status === 'done' && allTasks[taskIndex].status !== 'done';
      
      const updatedTask = {
        ...allTasks[taskIndex],
        ...data,
        updatedAt: new Date().toISOString(),
        // Update completedAt if the task is being marked as done
        completedAt: isCompletingTask ? new Date().toISOString() : allTasks[taskIndex].completedAt
      };
      
      allTasks[taskIndex] = updatedTask;
      saveTasksToStorage(allTasks);
      
      // Update state
      setTasks(prev => 
        prev.map(t => t.id === id ? updatedTask : t)
      );
      
      toast.success("Task updated successfully");
      return updatedTask;
    } catch (err) {
      setError("Failed to update task");
      toast.error("Failed to update task");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    tasks,
    isLoading,
    error,
    createTask,
    getTasks,
    deleteTask,
    updateTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
