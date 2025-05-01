
import React, { useState } from "react";
import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import NewTaskDialog from "./NewTaskDialog";
import { useTasks } from "@/contexts/TaskContext";

interface TaskListProps {
  tasks: Task[];
  projectId: string;
  onRefresh: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, projectId, onRefresh }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { deleteTask, updateTask } = useTasks();

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
      setIsDeleteDialogOpen(false);
      setSelectedTask(null);
      onRefresh();
    }
  };

  const handleStatusChange = async (task: Task, status: Task["status"]) => {
    await updateTask(task.id, { status });
    onRefresh();
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tasks found. Create a task to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {selectedTask && (
        <NewTaskDialog
          projectId={projectId}
          existingTask={selectedTask}
          isOpen={isTaskDialogOpen}
          setIsOpen={(open) => {
            setIsTaskDialogOpen(open);
            if (!open) {
              setSelectedTask(null);
              onRefresh();
            }
          }}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
              "{selectedTask?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskList;
