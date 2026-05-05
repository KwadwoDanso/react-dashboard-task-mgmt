// TaskForm.tsx — controlled form for adding/editing tasks with validation

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { TaskFormProps, TaskFormData, FormErrors } from "../../types";
import { validateForm } from "../../utils/taskUtils";

function TaskForm({ onSubmit, onCancel, initialData, theme }: TaskFormProps) {
    // console.log("TaskForm render, editing:", initialData?.id);
    const isDark = theme === "dark";

    // Single state object for all form fields (lesson 8 pattern)
    const [formData, setFormData] = useState<TaskFormData>({
        title: initialData?.title || "",
        description: initialData?.description || "",
        status: initialData?.status || "pending",
        priority: initialData?.priority || "medium",
        dueDate: initialData?.dueDate || "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Generic change handler — uses input's name to update the right field
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the error for this field as user types
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Submit — validate first, then call parent if valid
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    // Style helpers — kept terse so the JSX stays readable
    const inputStyle = (hasError: boolean) => ({
        width: "100%",
        padding: "0.6rem 0.75rem",
        border: `1px solid ${hasError ? "#ef4444" : (isDark ? "#4b5563" : "#d1d5db")}`,
        borderRadius: "8px",
        fontSize: "0.95rem",
        fontFamily: "inherit",
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        color: isDark ? "#e5e7eb" : "#111827",
        transition: "border-color 0.2s ease",
        outline: "none",
    });

    const labelStyle = { display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem", color: isDark ? "#d1d5db" : "#374151" };
    const errorStyle = { fontSize: "0.8rem", color: "#ef4444", marginTop: "0.25rem" };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                padding: "1.5rem",
                backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#f9fafb",
                borderRadius: "12px",
                marginBottom: "1.5rem",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
                animation: "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            <h3 style={{ marginTop: 0, marginBottom: "1rem", color: isDark ? "#e5e7eb" : "#111827" }}>
                {initialData ? "Edit Task" : "New Task"}
            </h3>

            <div style={{ marginBottom: "0.75rem" }}>
                <label style={labelStyle} htmlFor="title">Title *</label>
                <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} style={inputStyle(!!errors.title)} placeholder="What needs to be done?" />
                {errors.title && <p style={errorStyle}>{errors.title}</p>}
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
                <label style={labelStyle} htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} style={{ ...inputStyle(!!errors.description), minHeight: "70px", resize: "vertical" as const }} placeholder="Add details (optional)" />
                {errors.description && <p style={errorStyle}>{errors.description}</p>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div>
                    <label style={labelStyle} htmlFor="status">Status</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} style={inputStyle(false)}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div>
                    <label style={labelStyle} htmlFor="priority">Priority</label>
                    <select id="priority" name="priority" value={formData.priority} onChange={handleChange} style={inputStyle(false)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label style={labelStyle} htmlFor="dueDate">Due Date *</label>
                    <input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} style={inputStyle(!!errors.dueDate)} />
                    {errors.dueDate && <p style={errorStyle}>{errors.dueDate}</p>}
                </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
                <button type="submit" style={{ padding: "0.6rem 1.25rem", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
                    {initialData ? "Save Changes" : "Add Task"}
                </button>
                <button type="button" onClick={onCancel} style={{ padding: "0.6rem 1.25rem", backgroundColor: isDark ? "#4b5563" : "#9ca3af", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default TaskForm;

