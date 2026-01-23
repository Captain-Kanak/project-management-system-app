## Project & User Management System

A professional dashboard built with React, TypeScript, and Vite, featuring secure administrative controls, project lifecycle management, and paginated data handling.

---

### 🚀 Key Features

- Project Management: Full CRUD operations for projects with soft-delete capabilities.
- User Administration: Admin-only dashboard to manage user roles (ADMIN, MANAGER, STAFF) and account statuses (ACTIVE, INACTIVE).
- State Management: Optimized data fetching and synchronization using TanStack Query (React Query).
- Authentication: Secure API interaction using custom hooks and Axios interceptors (useAxiosSecure).
- Modern UI/UX:
  -- Responsive tables with server-side pagination.
  -- Interactive status updates using inline controls.
  -- Professional feedback using SweetAlert2 and React Hot Toast.
  -- Reusable modal components for creating and editing projects.

---

### 🛠 Tech Stack

- Frontend: React 18, Vite, TypeScript
- Styling: Tailwind CSS
- Data Fetching: TanStack Query (v5)
- HTTP Client: Axios
- Database/ORM: Prisma (Backend)
- UI Components: Lucide React / React Icons, SweetAlert2

---

### 🏛 Architecture Overview

The application follows a modular architecture to ensure scalability and maintainability.

- /components: Reusable UI elements (Modals, Tables, Spinners).
- /hooks: Custom logic like useAxiosSecure for handling JWT and API security.
- /auth: Context providers for managing user sessions and permissions.
- /pages: View-level components (AllProjects, AllUsers, Dashboard).

---

### 🔒 Administrative Rules

- Role Management: Admins can promote/demote users via PATCH /users/:id/role.
- Status Control: Admins can block/activate accounts via PATCH /users/:id/status.
- Soft Deletion: Projects are never permanently removed on the first action; they are marked isDeleted: true via DELETE /projects/:id.

---

## 👤 Author

- Kanak Ray
- Full Stack Developer
- (Node.js · Express.js · TypeScript · PostgreSQL · Prisma)

---

## 📄 License

This project is intended for educational and demonstration purposes.
