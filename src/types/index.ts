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

// Component prop types
export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (id: string, status: TaskStatus) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
    onReorder: (fromId: string, toId: string) => void;
    theme: Theme;
}

export interface TaskItemProps {
    task: Task;
    onStatusChange: (id: string, status: TaskStatus) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
    onDragStart: (id: string) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (id: string) => void;
    isDragging: boolean;
    theme: Theme;
}

export interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void;
    onCancel: () => void;
    initialData?: Task;
    theme: Theme;
}

export interface TaskFilterProps {
    filters: TaskFilters;
    onFilterChange: (filters: TaskFilters) => void;
    sortBy: SortBy;
    onSortChange: (sort: SortBy) => void;
    theme: Theme;
}