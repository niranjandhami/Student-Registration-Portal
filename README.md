# Enrolla — Student Registration Portal

A full-stack student registration and records platform: students self-register and manage
their own profile; administrators get a searchable, editable roster.

## Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt
- **Frontend:** React 18, Vite, React Router, Axios

## Project structure

```
Student-Registration-Portal/
├── backend/
│   ├── config/          # DB connection, JWT helpers, admin seed script
│   ├── controllers/      # auth + student business logic
│   ├── middleware/       # JWT auth guard, role guard, error handler
│   ├── models/           # Student, Admin (Mongoose schemas)
│   ├── routes/           # /api/auth, /api/students
│   └── server.js
│
└── frontend/
    └── src/
        ├── pages/         # Landing, Register, Login, Dashboards, etc.
        ├── components/    # Navbar, StudentIdCard, StudentTable, ...
        ├── context/       # AuthContext
        ├── services/      # axios instance + API calls
        └── App.jsx
```

## Modules implemented

1. Student registration
2. Student login
3. JWT authentication (role-aware: student / admin)
4. Student dashboard
5. Edit profile (+ change password)
6. Admin login
7. Admin dashboard (roster summary)
8. View all students (paginated)
9. Search students (by name, roll number, course, email, department)
10. Update / delete students (admin)

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env      # then fill in MONGO_URI and JWT_SECRET
npm install
npm run seed:admin        # creates your first admin login, using the SEED_ADMIN_* vars in .env
npm run dev                # starts on http://localhost:5000
```

You need a MongoDB instance — either install MongoDB locally, or create a free cluster at
mongodb.com/cloud/atlas and paste its connection string into `MONGO_URI`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # points at http://localhost:5000/api by default
npm install
npm run dev                 # starts on http://localhost:5173
```

Open http://localhost:5173 — register as a student, or sign in at `/admin/login` with the
admin account created by the seed script.

## Publishing / deploying

- **Backend:** any Node host (Render, Railway, Fly.io) + MongoDB Atlas for the database.
- **Frontend:** `npm run build` in `frontend/` produces a static `dist/` folder — deploy to
  Vercel, Netlify, or any static host. Set `VITE_API_URL` to your deployed backend's URL.
- Set `CLIENT_ORIGIN` in the backend `.env` to your deployed frontend's URL so CORS allows it.
- Generate a strong `JWT_SECRET` for production (e.g. `openssl rand -hex 32`) — never reuse the
  example value.

## Security notes

- Passwords are hashed with bcrypt; only the admin seed script writes a plaintext password (to `.env`, which is gitignored).
- Login endpoints are rate-limited (20 attempts / 15 min per IP).
- Students can only ever read/edit their own record; all roster-wide endpoints require the `admin` role.
