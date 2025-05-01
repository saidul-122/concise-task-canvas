
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/ProjectContext";
import ProjectCard from "@/components/projects/ProjectCard";
import NewProjectDialog from "@/components/projects/NewProjectDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Project } from "@/types";
import { Plus } from "lucide-react";

const Projects: React.FC = () => {
  const { projects, getProjects, deleteProject, isLoading } = useProjects();
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    getProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsProjectDialogOpen(true);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProject) {
      await deleteProject(selectedProject.id);
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-500">Manage your projects and tasks</p>
        </div>
        <Button onClick={() => setIsProjectDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-6">Create your first project to get started</p>
          <Button onClick={() => setIsProjectDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>
      )}

      <NewProjectDialog
        isOpen={isProjectDialogOpen}
        setIsOpen={setIsProjectDialogOpen}
        existingProject={selectedProject || undefined}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              "{selectedProject?.name}" and all of its tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Projects;
