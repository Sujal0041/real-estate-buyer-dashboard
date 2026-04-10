# Buyer Portal – Auth + Favourites

This project is a simple full-stack buyer portal built as part of a take-home assessment.
The goal was to implement user authentication and a small dashboard where users can manage their favourite properties.

The focus was on keeping things clean, secure, and easy to understand rather than over-engineering.

---

## What this project demonstrates

- A working authentication flow (register + login)
- Secure password handling using bcrypt
- JWT-based authentication and protected routes
- A simple relational database design
- CRUD operations for favourites
- Clear separation between frontend and backend
- Basic UX improvements (loading states, errors, toasts)

---

## Tech Stack

**Frontend**

- React (with TypeScript)
- React Router
- Axios
- Bootstrap

**Backend**

- Node.js
- Express
- SQLite
- JWT for authentication
- bcrypt for password hashing

---

## Features

### Authentication

- Users can register with name, email, and password
- Passwords are hashed (not stored in plain text)
- Users can log in and receive a JWT token
- Protected routes ensure only logged-in users access the dashboard

---

### Buyer Dashboard

- Displays the logged-in user’s name and role
- Shows a list of available properties (seeded data)
- Users can:
    - Add properties to favourites
    - Remove properties from favourites

- “My Favourites” section updates instantly

---

### Security

- Passwords are hashed using bcrypt
- JWT is required for protected API routes
- The backend always determines the user from the token
- Users cannot access or modify other users’ favourites

---

### UX considerations

- Clear error messages (e.g., invalid login, duplicate email)
- Loading states for async actions
- Toast notifications for actions like:
    - adding a favourite
    - removing a favourite

- Simple, clean UI without unnecessary complexity

## How to run the project

### 1. Clone the repo

```bash
git clone https://github.com/Sujal0041/real-estate-buyer-dashboard.git
Different Terminal
cd Backend
cd Frontend
```

---

## Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
JWT_SECRET= RANDOM API KEY
```

Start the server:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔄 Example flow

1. Register a new account
2. Login using email and password
3. You’ll be redirected to the dashboard
4. Browse available properties
5. Add/remove favourites
6. See favourites update in real time

---

## API overview

**Auth**

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

**Properties**

- `GET /api/properties`

**Favourites**

- `GET /api/favourites`
- `POST /api/favourites/:propertyId`
- `DELETE /api/favourites/:propertyId`

---
