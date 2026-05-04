// types/index.ts — all shared interfaces and types

export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";
export type SortBy = "dueDate" | "priority" | "title";
export type Theme = "light" | "dark";

// Main task object
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    createdAt: number;
}