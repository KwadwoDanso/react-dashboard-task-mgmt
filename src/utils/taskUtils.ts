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
