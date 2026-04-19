# MiniZira – Bug Tracker for Teams

MiniZira is a full-stack bug tracking application inspired by tools like Jira. It allows teams to collaboratively manage issues, assign tasks, and track progress in a structured workflow.

---

## Live Demo

* Frontend: *https://mini-zira.vercel.app*
* Backend API: *https://minizira.onrender.com*

---

## Features

### Authentication

* User Signup & Login (JWT-based)
* Secure password hashing with bcrypt
* Protected routes

---

### Team Management

* Create teams
* Join teams using **Invite Code**
* View all joined teams

---

### Issue Tracking

* Create issues within a team
* Assign issues to team members
* Set priority (Low / Medium / High)
* Track status:

  * Open
  * In Progress
  * Resolved

---

### Comments

* Add comments on issues
* View discussion thread per issue

---

### Dashboard

* View all teams
* Navigate to team-specific issue boards

---

### Kanban-style Board

* Issues categorized by status:

  * Open
  * In Progress
  * Resolved

---

## Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router DOM
* tailwind

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📁 Project Structure

```
MiniZira/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
```

---

## Setup Instructions

### Clone the Repository

```
git clone https://github.com/somraj112/MiniZira.git
cd MiniZira
```

---

### Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```
npm run dev
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## API Endpoints (Important)

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/me`

### Teams

* POST `/api/teams`
* GET `/api/teams`
* POST `/api/teams/join`

### Issues

* POST `/api/issues`
* GET `/api/issues?teamId=`
* PUT `/api/issues/:id`
* PATCH `/api/issues/:id/status`
* DELETE `/api/issues/:id`

### Comments

* POST `/api/comments/:issueId`
* GET `/api/comments/:issueId`

---

## Key Highlights

* Clean REST API design
* Modular backend architecture (MVC pattern)
* Real-world team collaboration workflow
* Fully deployed and production-ready

---

## Challenges Faced

* MongoDB Atlas connection issues (IP whitelisting)
* Deployment errors on Render (build config)
* Managing authentication across frontend and backend

---

## Future Improvements

* Drag-and-drop Kanban board
* Role-based permissions (Admin/User)
* Notifications system
* File attachments in issues
* Real-time updates (WebSockets)

---

## Author

**Somraj Nandi**

* GitHub: https://github.com/somraj112

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
