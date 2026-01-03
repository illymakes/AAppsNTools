# AAppsNTools

**AAppsNTools** is a React-based portfolio project built to explore modern frontend application architecture using **Vite** and **React**, with a focus on component-driven UI design, state management, filtering, and interactive user experiences.

🔗 **Live Demo:**  
https://illymakes.github.io/AAppsNTools/

---

## Overview

This project began as an internal prototype for a web application in a previous role and was later repurposed as a **portfolio example** to showcase frontend development skills. In its current form, AAppsNTools presents a tile-based media catalog featuring **movies, books, and video games**, demonstrating common patterns found in production React applications.

The app emphasizes usability, performance, and modular UI design, while remaining framework-agnostic enough to be adapted for real-world, data-backed use cases.

---

## Features

- **Responsive tile grid layout**
  - Displays media items as cards in a flexible grid
  - Supports both **expanded** and **condensed** card views

- **Media filtering**
  - Filter by medium (Books, Movies, Video Games)
  - Sort alphabetically (A–Z / Z–A)

- **Search functionality**
  - Search across multiple fields:
    - Title
    - Year
    - Medium
    - Genre / tags
    - Description text

- **Favorites system**
  - Users can favorite items
  - Favorites persist using cookies/local storage
  - Architecture can easily be extended to account-based persistence

- **Detail overlays**
  - Clicking a card opens a modal overlay with expanded information
  - Includes contextual actions and external links

- **Light / Dark mode**
  - Fully themed UI using Material UI’s theming system
  - Smooth transitions between modes

- **Navigation & layout**
  - Top application bar
  - Collapsible side menu
  - Modal overlays and UI layers with proper z-index handling

---

## Tech Stack

- **React** – component-based UI architecture
- **Vite** – fast development server and optimized builds
- **Material UI (MUI)** – layout, theming, and UI components
- **Font Awesome** – iconography
- **CSS / MUI styling overrides** – custom visual refinements

---

## Architecture Notes

- Media data is currently loaded from static JSON files to keep the project lightweight and portable.
- State is managed via React hooks and context (e.g., favorites management).
- The codebase is structured to allow easy replacement of static data with:
  - REST APIs
  - GraphQL
  - Authenticated, account-based backends
- Favorites persistence is currently cookie-based but intentionally abstracted for future expansion.

---

## Purpose

This project exists to demonstrate:

- Practical React patterns used in real applications
- UI state management and filtering logic
- Component composition and reusability
- Theming and accessibility considerations
- How a prototype can evolve into a polished, production-style frontend

It is not intended to be a finished consumer product, but rather a **working example of frontend problem-solving and design implementation**.

---

## Author

Built with ❤️ by **illymakes**  
🔗 https://illymakes.com  
🔗 https://github.com/illymakes

---

## License

This project is provided for portfolio and demonstration purposes.
