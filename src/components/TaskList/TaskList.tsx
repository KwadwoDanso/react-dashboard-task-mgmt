// TaskList.tsx — renders the list with drag-and-drop reordering and empty state

import { useState } from "react";
import type { DragEvent } from "react";
import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onStatusChange, onDelete, onEdit, onReorder, theme }: TaskListProps) {
    // console.log("TaskList render with " + tasks.length + " tasks");

    // Track which task is currently being dragged
    const [draggingId, setDraggingId] = useState<string | null>(null);

    const handleDragStart = (id: string) => setDraggingId(id);
    const handleDragOver = (e: DragEvent) => e.preventDefault();
    const handleDrop = (targetId: string) => {
        if (draggingId && draggingId !== targetId) onReorder(draggingId, targetId);
        setDraggingId(null);
    };

    const isDark = theme === "dark";