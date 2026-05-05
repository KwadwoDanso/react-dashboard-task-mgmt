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