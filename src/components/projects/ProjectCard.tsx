
import React from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onDelete: (project: Project) => void;
  onEdit: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete, onEdit }) => {
  const navigate = useNavigate();
  
  const timeAgo = formatDistanceToNow(new Date(project.createdAt), { addSuffix: true });

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(project)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => onDelete(project)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Created {timeAgo}</p>
        <p className="mt-3 line-clamp-3 h-[72px]">{project.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(`/projects/${project.id}/tasks`)}
        >
          View Tasks
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
