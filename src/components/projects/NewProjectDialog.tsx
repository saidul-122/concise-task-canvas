
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types";
import { useProjects } from "@/contexts/ProjectContext";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

interface NewProjectDialogProps {
  existingProject?: Project;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ existingProject, isOpen, setIsOpen }) => {
  const [name, setName] = useState(existingProject?.name || "");
  const [description, setDescription] = useState(existingProject?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createProject, updateProject } = useProjects();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (existingProject) {
        await updateProject(existingProject.id, name, description);
      } else {
        await createProject(name, description);
      }
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Project save error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!existingProject) {
      setName("");
      setDescription("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {existingProject ? "Edit Project" : "Create New Project"}
            </DialogTitle>
            <DialogDescription>
              {existingProject 
                ? "Update your project details below."
                : "Add a new project to organize your tasks."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
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
                  {existingProject ? "Updating..." : "Creating..."}
                </>
              ) : (
                existingProject ? "Update Project" : "Create Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
