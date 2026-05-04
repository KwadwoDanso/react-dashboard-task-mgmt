// taskUtils.ts — pure helper functions for tasks

import type { Task, TaskFilters, SortBy, TaskFormData, FormErrors } from "../types";

// Filter tasks by status, priority, and search text
export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
    const q = filters.search.trim().toLowerCase();
    return tasks.filter((t) => {
        if (filters.status && t.status !== filters.status) return false;
        if (filters.priority && t.priority !== filters.priority) return false;
        if (q && !t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
        return true;
    });
}

// Sort tasks by chosen field
export function sortTasks(tasks: Task[], sortBy: SortBy): Task[] {
    const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
    const sorted = [...tasks];
    if (sortBy === "dueDate") sorted.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    if (sortBy === "priority") sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    if (sortBy === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
}

// Validate form data — returns errors for invalid fields
export function validateForm(data: TaskFormData): FormErrors {
    const errors: FormErrors = {};
    if (!data.title.trim()) errors.title = "Title is required";
    else if (data.title.trim().length < 3) errors.title = "Title must be at least 3 characters";
    if (data.description.trim().length > 200) errors.description = "Description must be 200 characters or fewer";
    if (!data.dueDate) errors.dueDate = "Due date is required";
    return errors;
}
// Format ISO date string as readable string
export function formatDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Generate a unique ID
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}