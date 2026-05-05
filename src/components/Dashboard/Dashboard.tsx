//dashboard
// Dashboard.tsx — main container that ties all components together
import { useState, useEffect } from "react";
import type { Task, TaskStatus, TaskFilters, TaskFormData, SortBy, Theme } from "../../types";
import { filterTasks, sortTasks, generateId } from "../../utils/taskUtils";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";

const STORAGE_KEY = "task-dashboard-data";
const THEME_KEY = "task-dashboard-theme";

function Dashboard() {
    // console.log("Dashboard render");

    // Load tasks from localStorage on first render
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Load theme preference (defaults to light)
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem(THEME_KEY) as Theme) || "light";
    });

    const [filters, setFilters] = useState<TaskFilters>({ search: "" });
    const [sortBy, setSortBy] = useState<SortBy>("dueDate");
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);