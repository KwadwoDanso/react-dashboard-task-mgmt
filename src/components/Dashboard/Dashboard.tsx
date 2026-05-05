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
    // Persist tasks whenever they change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    // Persist theme whenever it changes
    useEffect(() => {
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    // ===== HANDLERS — defined inside the function so they have access to state =====

    const handleSubmit = (data: TaskFormData) => {
        if (editingTask) {
            // Update the existing task
            setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t)));
            setEditingTask(null);
        } else {
            // Create a brand new task
            const newTask: Task = { ...data, id: generateId(), createdAt: Date.now() };
            setTasks((prev) => [...prev, newTask]);
        }
        setShowForm(false);
    };

    const handleStatusChange = (id: string, status: TaskStatus) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    };

    const handleDelete = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };