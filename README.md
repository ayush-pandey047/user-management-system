# User Management System

A production-grade full-stack User Management System built with Node.js, Express, TypeScript, Prisma, MySQL on the backend and React, TypeScript, Vite, Tailwind CSS, ShadCN UI on the frontend.

## Features

- Full CRUD for users (Create, Read, Update, Soft Delete)
- Server-side pagination, search, and sorting
- Strict validation: unique email, 12-digit Aadhaar, Indian PAN format, 10-digit mobile numbers
- Soft delete with `isDeleted` / `deletedAt` flags — records are never hard-deleted
- Optimistic locking via `version` field
- Layered backend architecture: controller → service → repository
- Centralized error handling, request validation middleware, structured logging (Winston)
- Swagger/OpenAPI docs at `/api-docs`
- Rate limiting, Helmet security headers, CORS, response compression
- React Query for server state, React Hook Form + Zod for client-side validation
- Dashboard with live user stats, responsive table, modals, toasts, loading skeletons, empty states
- Jest + Supertest integration tests covering controllers, services, validation, and middleware

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Prisma ORM, MySQL, Zod, Winston, Jest, Supertest, Swagger
**Frontend:** React, TypeScript, Vite, React Router, Axios, React Hook Form, Zod, TanStack Query, Tailwind CSS v4, ShadCN UI

## Folder Structure
user-management-system/

├── backend/

│   ├── src/

│   │   ├── config/         # env, database (Prisma client)

│   │   ├── controllers/    # request handlers

│   │   ├── services/       # business logic

│   │   ├── repositories/   # data access layer (Prisma queries)

│   │   ├── routes/         # Express routers + Swagger annotations

│   │   ├── middlewares/    # validate, errorHandler, asyncHandler

│   │   ├── validators/     # Zod schemas

│   │   ├── dtos/           # response shaping

│   │   ├── utils/          # logger, apiResponse, pagination

│   │   ├── exceptions/     # custom error classes

│   │   ├── docs/           # swagger config

│   │   └── tests/          # Jest + Supertest integration tests

│   └── prisma/

│       ├── schema.prisma

│       └── seed.ts

└── frontend/

└── src/

├── api/             # axios instance

├── services/        # API call wrappers

├── hooks/           # React Query hooks

├── components/      # UserFormDialog, DeleteUserDialog, ui/ (ShadCN)

├── pages/           # DashboardPage, UsersPage

├── layouts/         # MainLayout (sidebar nav)

├── routes/          # AppRoutes

├── schemas/         # Zod form schemas

└── types/           # shared TS interfaces


## Setup Instructions

### 1. Clone and install
```bash
git clone https://github.com/<your-username>/user-management-system.git
cd user-management-system/backend && npm install
cd ../frontend && npm install
```

### 2. MySQL setup
```sql
CREATE DATABASE user_management;
```

### 3. Environment variables

`backend/.env`:

DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/user_management"

PORT=5001

NODE_ENV=development

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=1d

`frontend/.env`:
VITE_API_BASE_URL=http://localhost:5001/api/v1

### 4. Migrate, generate, seed
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed
```

### 5. Run both servers
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Frontend: `http://localhost:3001` (or whatever port Vite assigns)
Backend: `http://localhost:5001`
API Docs: `http://localhost:5001/api-docs`

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users` | Create user |
| GET | `/api/v1/users?page=1&limit=10&search=&sortBy=&sortOrder=` | List users (paginated) |
| GET | `/api/v1/users/:id` | Get user by ID |
| PUT | `/api/v1/users/:id` | Update user |
| DELETE | `/api/v1/users/:id` | Soft delete user |
| GET | `/api/v1/users/stats` | User stats (total/active/deleted) |

Full interactive docs at `/api-docs`.

## Running Tests
```bash
cd backend
npm test
```

## Screenshots

### User Management
![Main_Page](./user_management.png)

### Dashboard
![Dashboard](./dashboard_page.png)

### Users Table
![Users Table](./user_page.png)



## License

MIT