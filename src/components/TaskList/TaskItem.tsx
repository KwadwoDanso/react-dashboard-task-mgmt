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

    return (
        <div
            draggable
            onDragStart={() => onDragStart(task.id)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(task.id)}
            style={{
                backgroundColor: statusBg,
                borderLeft: `4px solid ${priorityColor}`,
                padding: "1rem 1.25rem",
                borderRadius: "12px",
                marginBottom: "0.75rem",
                cursor: "grab",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: isDragging ? 0.4 : 1,
                transform: isDragging ? "scale(0.98)" : "scale(1)",
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
                color: isDark ? "#e5e7eb" : "#111827",
                textDecoration: task.status === "completed" ? "line-through" : "none",
                animation: "slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                    <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem", fontWeight: 600 }}>{task.title}</h3>
                    {task.description && (
                        <p style={{ margin: "0 0 0.5rem", fontSize: "0.9rem", opacity: 0.8 }}>{task.description}</p>
                    )}
                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", opacity: 0.7, flexWrap: "wrap" }}>
                        <span>Priority: <strong>{task.priority}</strong></span>
                        <span>Due: <strong>{formatDate(task.dueDate)}</strong></span>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                    <select
                        value={task.status}
                        onChange={handleStatusChange}
                        style={{
                            padding: "0.4rem 0.6rem",
                            border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            backgroundColor: isDark ? "#1f2937" : "#ffffff",
                            color: isDark ? "#e5e7eb" : "#111827",
                            cursor: "pointer",
                        }}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <button onClick={() => onEdit(task)} style={btn("#f59e0b")}>Edit</button>
                    <button onClick={handleDelete} style={btn("#ef4444")}>Delete</button>
                </div>
            </div>
        </div>
    );
}

// Small button style helper
function btn(bg: string) {
    return {
        padding: "0.4rem 0.8rem",
        backgroundColor: bg,
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.85rem",
        transition: "transform 0.15s ease",
    };
}

export default TaskItem;
