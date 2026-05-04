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


    // Empty state
    if (tasks.length === 0) {
        return (
            <div style={{
                padding: "3rem 1rem",
                textAlign: "center",
                backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#f9fafb",
                borderRadius: "12px",
                color: isDark ? "#9ca3af" : "#6b7280",
                animation: "fadeIn 0.4s ease",
            }}>
                <p style={{ fontSize: "1.05rem", margin: 0 }}>No tasks to show</p>
                <p style={{ fontSize: "0.85rem", margin: "0.5rem 0 0" }}>Add a new task or adjust your filters.</p>
            </div>
        );
    }
