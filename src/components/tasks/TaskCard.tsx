
import React from "react";
import { Task } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: Task["status"]) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const createdAt = formatDistanceToNow(new Date(task.createdAt), { addSuffix: true });
  const completedDate = task.completedAt 
    ? format(new Date(task.completedAt), "PPP")
    : null;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-500">Created {createdAt}</p>
        </div>
        <div className="flex items-start space-x-2">
          <StatusBadge status={task.status} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                disabled={task.status === "todo"}
                onClick={() => onStatusChange(task, "todo")}
              >
                Set as To Do
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                disabled={task.status === "in-progress"}
                onClick={() => onStatusChange(task, "in-progress")}
              >
                Set as In Progress
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                disabled={task.status === "review"}
                onClick={() => onStatusChange(task, "review")}
              >
                Set as In Review
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                disabled={task.status === "done"}
                onClick={() => onStatusChange(task, "done")}
              >
                Set as Done
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(task)}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{task.description}</p>
      </CardContent>
      {task.status === "done" && task.completedAt && (
        <CardFooter>
          <p className="text-xs text-green-700">✓ Completed on {completedDate}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskCard;
