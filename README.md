# Task Management Dashboard SBA
 
A React + TypeScript dashboard application for managing tasks with full CRUD, search, filtering, sorting, drag-and-drop reordering, light/dark themes, and persistent data via localStorage.
 
## Table of contents
 
- [Overview](#overview)
  - [Features](#features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Reflections](#reflections)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
## Overview
 
A complete task management dashboard built with React 18 and TypeScript. The application demonstrates component composition, TypeScript interfaces with proper `import type` syntax, controlled forms with validation, list rendering with unique keys, conditional rendering, state management with useState/useEffect, drag-and-drop reordering, persistent storage, and theming.
 
### Features
 
- Add new tasks with title, description, status, priority, and due date
- Edit existing tasks in-place
- Delete tasks with confirmation
- Change task status from a dropdown (pending, in-progress, completed)
- Filter tasks by status and priority
- Search tasks by keyword across title and description
- Sort tasks by due date, priority, or title
- Drag-and-drop to reorder tasks within the list
- Dashboard statistics showing total, pending, in-progress, and completed counts
- Light and dark mode toggle with smooth gradient backgrounds
- Form validation with friendly error messages
- All data persists in localStorage across page refreshes
- Smooth animations and transitions for state changes
- Active filter chips show currently applied filters at a glance
