
import React from "react";
import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types";

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusLabels: Record<TaskStatus, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "review": "In Review",
  "done": "Done"
};

const statusColors: Record<TaskStatus, { bg: string, text: string }> = {
  "todo": { bg: "bg-gray-200", text: "text-gray-700" },
  "in-progress": { bg: "bg-amber-100", text: "text-amber-800" },
  "review": { bg: "bg-blue-100", text: "text-blue-800" },
  "done": { bg: "bg-green-100", text: "text-green-800" }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { bg, text } = statusColors[status];
  
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", 
      bg, 
      text,
      className
    )}>
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;
