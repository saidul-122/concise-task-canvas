
export type User = {
  id: string;
  email: string;
  name: string;
  country: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  createdAt: string;
  completedAt: string | null;
  updatedAt: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string, country: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export type ProjectContextType = {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  createProject: (name: string, description: string) => Promise<Project>;
  getProjects: () => Promise<Project[]>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (id: string, name: string, description: string) => Promise<Project>;
};

export type TaskContextType = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  createTask: (data: { title: string; description: string; projectId: string; status: TaskStatus }) => Promise<Task>;
  getTasks: (projectId: string) => Promise<Task[]>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
};
