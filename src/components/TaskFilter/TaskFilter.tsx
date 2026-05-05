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