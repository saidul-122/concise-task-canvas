
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task, TaskStatus } from "@/types";
import { useTasks } from "@/contexts/TaskContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface NewTaskDialogProps {
  projectId: string;
  existingTask?: Task;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NewTaskDialog: React.FC<NewTaskDialogProps> = ({ 
  projectId, 
  existingTask, 
  isOpen, 
  setIsOpen 
}) => {
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [status, setStatus] = useState<TaskStatus>(existingTask?.status || "todo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createTask, updateTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (existingTask) {
        await updateTask(existingTask.id, { title, description, status });
      } else {
        await createTask({ 
          title, 
          description, 
          projectId,
          status 
        });
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Task save error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!existingTask) {
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {existingTask ? "Edit Task" : "Create New Task"}
            </DialogTitle>
            <DialogDescription>
              {existingTask 
                ? "Update your task details below." 
                : "Add a new task to your project."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select task status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {existingTask ? "Updating..." : "Creating..."}
                </>
              ) : (
                existingTask ? "Update Task" : "Create Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
