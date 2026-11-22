# DecisionHub — Java Full Stack

Collaborative Decision Intelligence System for Option Analysis and Community Engagement

**Tech Stack:** React.js + Spring Boot + MySQL + Spring Security + JWT

---

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8.0+

---

## Setup & Run

### 1. Database
Create MySQL database (auto-created if `createDatabaseIfNotExist=true`):
```sql
CREATE DATABASE decisionhub_db;
```

### 2. Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Runs on: http://localhost:8080

### 3. Frontend (React)
```bash
cd frontend
npm install
npm start
```
Runs on: http://localhost:3000

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/polls | Get all public polls |
| POST | /api/polls | Create poll |
| POST | /api/polls/{id}/vote | Submit vote |
| GET | /api/teams | Get all teams |
| POST | /api/teams | Create team |
| GET | /api/communities | Get communities |
| POST | /api/communities | Create community |
| GET | /api/comparisons | Get comparisons |
| POST | /api/comparisons | Create comparison |
| GET | /api/analytics/dashboard | Get stats |
| GET | /api/users/profile | Get profile |
| PUT | /api/users/profile | Update profile |
| GET | /api/notifications | Get notifications |
| POST | /api/feedback | Submit feedback |

---

## Modules

- **Landing** — Public-facing intro page
- **Login / Register** — JWT-secured authentication
- **Dashboard** — Centralized stats and quick navigation
- **Polls** — Single-choice, multiple-choice, rating polls
- **Create Poll** — Poll builder with visibility settings
- **Option Comparison** — Side-by-side pros/cons/cost/risk analysis
- **Teams** — Group creation and joining
- **Communities** — Interest-based communities
- **Analytics** — Bar charts and pie charts via Recharts
- **Notifications** — Activity updates
- **Profile** — User info and edit
- **Feedback** — Rating-based feedback form
