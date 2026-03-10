# Full-Stack Bun Template

Minimal template with a Bun + Express + Prisma backend and a Bun + React frontend.

## Project Structure

```text
end-sem/
├── backend/                         # API server, auth logic, and database access
│   ├── src/                         # Backend source code
│   │   ├── controller/              # Request handlers for API endpoints
│   │   │   └── authController.ts    # Signup/login controller logic
│   │   ├── routes/                  # Express route definitions
│   │   │   ├── authRoute.ts         # Auth routes (/signup, /login)
│   │   │   └── index.ts             # Main API route aggregator
│   │   ├── utils/                   # Shared backend helpers and schemas
│   │   │   ├── config.ts            # Environment config (PORT, DB URL, JWT secret)
│   │   │   └── type.ts              # Zod validation schema(s)
│   │   └── index.ts                 # Express app bootstrap and middleware setup
│   ├── prisma/                      # Prisma schema and DB modeling
│   │   └── schema.prisma            # Database schema (User model)
│   ├── generated/prisma/            # Prisma generated client output
│   ├── db.ts                        # Prisma client initialization with Postgres 
│
├── frontend/                        # React app UI and client-side routing
│   ├── src/                         # Frontend source code
│   │   ├── components/              # Reusable and page-level UI components
│   │   │   ├── pages/               # Route/page components (Signin, Signup, etc.)
│   │   │   └── ui/                  # Shared UI primitives (button, input, card, etc.)
│   │   ├── lib/                     # Frontend utilities and API client setup
│   │   │   ├── axios-instance.ts    # Axios client with base URL + auth header interceptor
│   │   ├── App.tsx                  # Main React router configuration
│
└── README.md                        # Project overview and folder guide
```

## Quick Start

```bash
# Backend
cd backend
bun install
bun run dev
```

```bash
# Frontend (new terminal)
cd frontend
bun install
bun run dev
```
