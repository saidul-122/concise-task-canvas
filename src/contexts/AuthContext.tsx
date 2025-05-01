
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { User, AuthContextType } from "@/types";

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions for authentication
const mockSignUp = async (email: string, password: string, name: string, country: string): Promise<{ user: User; token: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be a call to your backend API
  const user: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    country
  };
  
  // Store in localStorage to persist the session (in a real app, use HTTP-only cookies)
  localStorage.setItem('user', JSON.stringify(user));
  const token = `mock-jwt-token-${Date.now()}`;
  localStorage.setItem('token', token);
  
  return { user, token };
};

const mockSignIn = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would validate credentials against your backend
  // For demo purposes, we'll accept any non-empty email/password
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  
  // Create a mock user based on the provided email
  const user: User = {
    id: `user-${Date.now()}`,
    email,
    name: email.split('@')[0],
    country: "Unknown"
  };
  
  // Store in localStorage to persist the session
  localStorage.setItem('user', JSON.stringify(user));
  const token = `mock-jwt-token-${Date.now()}`;
  localStorage.setItem('token', token);
  
  return { user, token };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    
    setIsLoading(false);
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, name: string, country: string) => {
    setIsLoading(true);
    try {
      const { user, token } = await mockSignUp(email, password, name, country);
      setUser(user);
      setToken(token);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user, token } = await mockSignIn(email, password);
      setUser(user);
      setToken(token);
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    toast.success("Signed out successfully");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
