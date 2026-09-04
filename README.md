# Meridian — Admin Dashboard

A full-stack admin dashboard scaffold: **React + TypeScript + Tailwind CSS** on the frontend, **.NET 8 Web API + Entity Framework Core + SQL Server** on the backend, with JWT authentication.

## What's included

- **Auth**: JWT login/register, password hashing with BCrypt, role-based authorization (`Admin`, `Manager`, `Member`)
- **Domain**: Users, Projects, Tasks — with a `/api/dashboard/summary` endpoint for aggregate stats
- **Frontend**: sidebar layout, protected routes, dashboard overview with a chart (Recharts), Projects and Team pages with create/update/delete
- **Dev convenience**: the API seeds a default admin (`admin@example.com` / `Admin123!`) and a sample project on first run
- **Swagger** UI in development for exploring the API

```
project/
├── backend/AdminDashboard.Api/   # .NET 8 Web API
├── frontend/                     # React + TS + Tailwind (Vite)
└── docker-compose.yml            # optional local SQL Server
```

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org)
- SQL Server (local install, or use the provided `docker-compose.yml`)
- The [EF Core CLI tool](https://learn.microsoft.com/ef/core/cli/dotnet): `dotnet tool install --global dotnet-ef`

This scaffold was written by hand in an environment without internet access or the .NET SDK installed, so it has **not been built or run**. Double-check package versions against current NuGet/npm registries before you rely on it, and expect to fix the small issues a first real build usually surfaces.

## Backend setup

```bash
cd backend/AdminDashboard.Api

# 1. Start SQL Server (skip if you already have one running)
cd ../.. && docker compose up -d && cd backend/AdminDashboard.Api

# 2. Restore packages
dotnet restore

# 3. Update the connection string and JWT key in appsettings.json
#    (the JWT "Key" MUST be changed to a long random secret before any real use)

# 4. Create the initial migration and apply it
dotnet ef migrations add InitialCreate
dotnet ef database update

# 5. Run the API (Swagger at https://localhost:5001/swagger)
dotnet run
```

The database is also auto-migrated and seeded on startup (`Program.cs` calls `db.Database.Migrate()` and `DbSeeder.Seed()`), so once the migration exists you can just `dotnet run` going forward.

**Seeded accounts:**
| Email | Password | Role |
|---|---|---|
| admin@example.com | Admin123! | Admin |
| manager@example.com | Manager123! | Manager |

## Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # points VITE_API_BASE_URL at the local API
npm run dev
```

Visit `http://localhost:5173` and sign in with the seeded admin account.

## Notes on production readiness

This is a scaffold to build on, not a finished product. Before shipping:
- Move the JWT signing key and DB connection string out of `appsettings.json` into environment variables / a secrets manager
- Add refresh tokens (the current JWT expires after 120 minutes with no renewal flow)
- Add input validation feedback in the frontend forms and pagination on the list endpoints
- Add automated tests (none are included)
- Review CORS origins for your actual deployed frontend URL
