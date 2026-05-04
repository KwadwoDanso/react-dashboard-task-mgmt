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

// Form data (the task fields without id/createdAt)
export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

// Form errors — each field optional, only set when invalid
export interface FormErrors {
    title?: string;
    description?: string;
    dueDate?: string;
}

// Filter selections
export interface TaskFilters {
    status?: TaskStatus;
    priority?: TaskPriority;
    search: string;
}