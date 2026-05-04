// TaskItem.tsx — single task card with drag, edit, delete, status dropdown
// NOTE: We import "type" for things only used as types (not runtime values).
// This satisfies verbatimModuleSyntax in modern Vite/TS configs.

import type { ChangeEvent } from "react";
import type { TaskItemProps, TaskStatus } from "../../types";
import { formatDate } from "../../utils/taskUtils";

function TaskItem({ task, onStatusChange, onDelete, onEdit, onDragStart, onDragOver, onDrop, isDragging, theme }: TaskItemProps) {
    // console.log("TaskItem render:", task.id);
    const isDark = theme === "dark";

    // Priority left-border color
    const priorityColor = { low: "#10b981", medium: "#f59e0b", high: "#ef4444" }[task.priority];

    // Status background tint (different shades for light vs dark mode)
    const statusBg = task.status === "completed"
        ? (isDark ? "rgba(16,185,129,0.15)" : "#d1fae5")
        : task.status === "in-progress"
            ? (isDark ? "rgba(99,102,241,0.15)" : "#e0e7ff")
            : (isDark ? "rgba(245,158,11,0.12)" : "#fef3c7");

    // Type the event explicitly for the status dropdown
    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onStatusChange(task.id, e.target.value as TaskStatus);
    };

    const handleDelete = () => {
        if (confirm("Delete this task?")) onDelete(task.id);
    };