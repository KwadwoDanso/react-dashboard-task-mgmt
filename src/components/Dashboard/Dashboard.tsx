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

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    // Reorder via drag and drop — move dragged task to position of target task
    const handleReorder = (fromId: string, toId: string) => {
        setTasks((prev) => {
            const fromIdx = prev.findIndex((t) => t.id === fromId);
            const toIdx = prev.findIndex((t) => t.id === toId);
            if (fromIdx === -1 || toIdx === -1) return prev;
            const next = [...prev];
            const [moved] = next.splice(fromIdx, 1);
            next.splice(toIdx, 0, moved);
            return next;
        });
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const handleAddNew = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    // ===== DERIVED STATE =====

    // Compute stats from tasks
    const stats = {
        total: tasks.length,
        pending: tasks.filter((t) => t.status === "pending").length,
        inProgress: tasks.filter((t) => t.status === "in-progress").length,
        completed: tasks.filter((t) => t.status === "completed").length,
    };

    // Apply filter then sort to get displayed tasks
    const visibleTasks = sortTasks(filterTasks(tasks, filters), sortBy);

    const isDark = theme === "dark";

    // Gradient backgrounds inspired by the uploaded designs
    const bgGradient = isDark
        ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)"
        : "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #f5f3ff 100%)";

    return (
        <div style={{ minHeight: "100vh", background: bgGradient, transition: "background 0.5s ease", padding: "2rem 1rem" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                {/* Header */}
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: isDark ? "#f3f4f6" : "#1e1b4b", letterSpacing: "-0.02em" }}>
                            Task Dashboard
                        </h1>
                        <p style={{ margin: "0.25rem 0 0", fontSize: "0.95rem", color: isDark ? "#a5b4fc" : "#6366f1", fontWeight: 500 }}>
                            Stay organized and ship your goals
                        </p>
                    </div>

                    <button onClick={toggleTheme} style={{
                        padding: "0.6rem 1.25rem",
                        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.15)",
                        color: isDark ? "#f3f4f6" : "#3730a3",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(99,102,241,0.3)"}`,
                        borderRadius: "9999px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        backdropFilter: "blur(8px)",
                        transition: "all 0.3s ease",
                    }}>
                        {isDark ? "Light Mode" : "Dark Mode"}
                    </button>
                </header>

                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <Stat label="Total" value={stats.total} color="#6366f1" isDark={isDark} />
                    <Stat label="Pending" value={stats.pending} color="#f59e0b" isDark={isDark} />
                    <Stat label="In Progress" value={stats.inProgress} color="#3b82f6" isDark={isDark} />
                    <Stat label="Completed" value={stats.completed} color="#10b981" isDark={isDark} />
                </div>

                {/* Add task button (hidden when form is open) */}
                {!showForm && (
                    <button onClick={handleAddNew} style={{
                        padding: "0.75rem 1.5rem",
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        marginBottom: "1.25rem",
                        boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                        transition: "transform 0.2s ease",
                    }}>
                        + Add New Task
                    </button>
                )}

                {/* Form (only when showForm is true) */}
                {showForm && (
                    <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} initialData={editingTask || undefined} theme={theme} />
                )}

                {/* Filters */}
                <TaskFilter filters={filters} onFilterChange={setFilters} sortBy={sortBy} onSortChange={setSortBy} theme={theme} />

                {/* Counter line */}
                <p style={{ fontSize: "0.85rem", color: isDark ? "#9ca3af" : "#6b7280", marginBottom: "0.75rem" }}>
                    Showing {visibleTasks.length} of {tasks.length} task{tasks.length === 1 ? "" : "s"}
                </p>

                {/* List */}
                <TaskList
                    tasks={visibleTasks}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onReorder={handleReorder}
                    theme={theme}
                />
            </div>

            {/* Inline keyframes — kept here so we don't need a separate CSS file */}
            <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); }
        select:focus, input:focus, textarea:focus { border-color: #6366f1 !important; }
      `}</style>
        </div>
    );
}

// Small stat card component
function Stat({ label, value, color, isDark }: { label: string; value: number; color: string; isDark: boolean }) {
    return (
        <div style={{
            padding: "1rem 1.25rem",
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)"}`,
            transition: "transform 0.3s ease",
        }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: isDark ? "#9ca3af" : "#6b7280", fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color: color, marginTop: "0.25rem" }}>{value}</div>
        </div>
    );
}

export default Dashboard;