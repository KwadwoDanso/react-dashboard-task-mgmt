// TaskFilter.tsx — search bar, filter dropdowns, sort, and active filter chips

import type { ChangeEvent } from "react";
import type { TaskFilterProps, SortBy } from "../../types";

function TaskFilter({ filters, onFilterChange, sortBy, onSortChange, theme }: TaskFilterProps) {
    // console.log("TaskFilter render, filters:", filters);
    const isDark = theme === "dark";

    const updateFilter = (key: "status" | "priority", value: string) => {
        // Empty string means "no filter for this category"
        onFilterChange({ ...filters, [key]: value || undefined });
    };

    const clearAll = () => onFilterChange({ search: "" });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filters, search: e.target.value });
    };

    const handleStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => updateFilter("status", e.target.value);
    const handlePrioritySelect = (e: ChangeEvent<HTMLSelectElement>) => updateFilter("priority", e.target.value);
    const handleSortSelect = (e: ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value as SortBy);

    const inputStyle = {
        padding: "0.55rem 0.85rem",
        border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
        borderRadius: "8px",
        fontSize: "0.9rem",
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        color: isDark ? "#e5e7eb" : "#111827",
        fontFamily: "inherit",
        outline: "none",
        transition: "border-color 0.2s ease",
    };

    const hasActive = filters.status || filters.priority || filters.search;

    return (
        <div style={{
            padding: "1rem",
            backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#f9fafb",
            borderRadius: "12px",
            marginBottom: "1.25rem",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
        }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <input
                    type="search"
                    placeholder="Search tasks..."
                    value={filters.search}
                    onChange={handleSearch}
                    style={{ ...inputStyle, flex: "1 1 200px" }}
                />

                <select value={filters.status || ""} onChange={handleStatusSelect} style={inputStyle}>
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <select value={filters.priority || ""} onChange={handlePrioritySelect} style={inputStyle}>
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <select value={sortBy} onChange={handleSortSelect} style={inputStyle}>
                    <option value="dueDate">Sort: Due Date</option>
                    <option value="priority">Sort: Priority</option>
                    <option value="title">Sort: Title</option>
                </select>
