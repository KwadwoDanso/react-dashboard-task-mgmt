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
 
A complete task management dashboard built with React 18 and TypeScript. The application demonstrates component composition, TypeScript interfaces with proper import type syntax, controlled forms with validation, list rendering with unique keys, conditional rendering, state management with useState/useEffect, drag-and-drop reordering, persistent storage, and theming.
 
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

### Links
 
- Solution URL: ([https://github.com/KwadwoDanso/react-dashboard-task-mgmt])
## My process
 
- Started by writing all the TypeScript interfaces in types/index.ts first so I knew the exact shape of every prop and data structure before writing any JSX.
- Created utils/taskUtils.ts with pure helper functions for filtering, sorting, validation, date formatting, and ID generation. Pure functions are easy to reason about and reuse.
- Built TaskItem first because it has no children of its own. Added drag-and-drop event handlers (onDragStart, onDragOver, onDrop) directly on the card.
- Built TaskList as the wrapper that maps through tasks, manages which task is currently being dragged, and renders the empty state when no tasks match.
- Built TaskForm using the single-state-object pattern from lesson 8. The name attribute on each input matches the corresponding key in the formData state, so one generic handleChange function works for every field.
- Built TaskFilter with controlled inputs for search, status filter, priority filter, and sort. Added active filter chips so users can see what filters are currently applied.
- Built Dashboard last to manage the master task array, theme state, form visibility, and all the callback handlers. Used useEffect to persist tasks and theme to localStorage whenever they change.
- Tested by uncommenting console.log calls at key points during development. All testing logs are commented out in the final code so they remain as evidence of testing without polluting the console.
### Built with
 
- React 19 with functional components and hooks
- TypeScript with strict mode and verbatimModuleSyntax for full type safety
- Vite as the build tool and dev server
- React useState for local component state
- React useEffect for syncing state to localStorage
- HTML5 drag-and-drop API for task reordering
- Inline styles using JavaScript objects with camelCase property names
- CSS keyframe animations for smooth state transitions
### What I learned
 
- The difference between import { ... } and import type { ... }. Modern Vite/TypeScript configs enable verbatimModuleSyntax, which requires type-only imports to use import type. Mixing values and types in one regular import statement causes errors.
- How to compose multiple components into a cohesive interface where the parent manages all state and child components communicate up through callback props (lesson 5 callback pattern).
- How to use the single-state-object pattern for forms with multiple inputs, using event.target.name to determine which field to update (lesson 8).
- How to validate form data and show field-specific error messages without a third-party library.
- How TypeScript union types like TaskStatus = "pending" | "in-progress" | "completed" catch typos at compile time.
- How to use the HTML5 drag-and-drop API in React with onDragStart, onDragOver, and onDrop to reorder list items by mutating an array of task objects immutably with splice.
- How to persist data with localStorage using useEffect so changes save automatically without an explicit save button.
- How to type event handlers with ChangeEvent<HTMLSelectElement> and FormEvent<HTMLFormElement> from React imported as import type.
- How to render dynamic gradient backgrounds that smoothly transition when toggling between light and dark mode.
## Reflections
 
- **How I implemented React and TypeScript features**
    - I used controlled components throughout — every input value is bound to a state variable and updated through an onChange handler.
    - All props are typed via interfaces in a central types/index.ts file. This served as both documentation and a contract enforced by the compiler.
    - I used the useState hook with explicit generics (e.g., useState<Task[]>([])) when the initial value didn't carry enough type information for inference.
    - I used useEffect to sync tasks and theme to localStorage as side effects of state changes.
    - I used union types (like TaskStatus, TaskPriority) to keep the set of allowed values small and explicit.
    - I separated import type { ... } from import { ... } to satisfy verbatimModuleSyntax.
- Challenges encountered and how I overcame them
    - The drag-and-drop reordering required tracking which task was being dragged across components. I solved this by managing the draggingId state in the TaskList parent and passing event handlers down to each TaskItem. The onReorder callback then bubbles up to the Dashboard which mutates the array immutably with splice.
    - Form validation needed to clear errors when the user fixes them. I added logic in handleChange to clear the error for a specific field as soon as the user starts editing it.
    - Keeping the styling cohesive across both light and dark themes was tricky. I used a theme prop passed down from Dashboard to every component, then computed colors conditionally inside each component.
    - Getting smooth animations on drag without breaking the layout required using CSS transform and opacity rather than animating layout properties directly.
    - I had to be careful about TypeScript's verbatimModuleSyntax mode. Initially I had errors because I imported types and values together. Splitting them into separate import type and import statements resolved every issue.
- Approach to component composition and state management
    - The app follows a strict top-down data flow. The Dashboard owns all state (tasks, filters, theme, sort, form visibility, editing task) and passes data down via props. Children communicate up through callback props.
    - Each component has a single, focused responsibility: TaskItem renders one card, TaskList maps the array, TaskForm handles input, TaskFilter handles filter UI, Dashboard orchestrates everything.
    - Pure utility functions (filterTasks, sortTasks, validateForm) live in taskUtils.ts separate from any component, so they can be tested and reused without React.
    - State updates always create new arrays/objects with the spread operator instead of mutating, so React's reference equality check correctly triggers re-renders.
## Author
 
Kwadwo Danso
 
## Acknowledgments
- Use of AI - Implementing the drag and drop and different components of the project
- React Documentation — Hooks (https://react.dev/reference/react)
- React Documentation — Forms and Controlled Components (https://react.dev/reference/react-dom/components/input)
- React Documentation — Rendering Lists (https://react.dev/learn/rendering-lists)
- TypeScript Handbook — Union Types and Interfaces (https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- TypeScript Documentation — verbatimModuleSyntax (https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax)
- MDN Web Docs — HTML5 Drag and Drop API (https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- MDN Web Docs — localStorage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Vite Documentation for project scaffolding (https://vite.dev/guide/)
- Per Scholas course materials and lessons covering React fundamentals, JSX, functional components, props, state, events, conditional rendering, lists/keys, and forms.