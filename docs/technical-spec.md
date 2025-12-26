
# Technical Specification
## Multi-Tenant SaaS Platform

---

## 1. Project Structure

### Backend Structure

backend/
├── src/
│ ├── controllers/ # API business logic
│ ├── routes/ # Express route definitions
│ ├── middleware/ # Auth, RBAC, error handling
│ ├── models/ # Database queries
│ ├── utils/ # JWT, audit logger
│ ├── config/ # DB & env config
│ └── server.js # App entry point
├── migrations/ # SQL migration files
├── seeds/ # Seed data SQL
├── Dockerfile
├── package.json
└── .env

### Frontend Structure

frontend/
├── src/
│ ├── pages/ # Route-based pages
│ ├── components/ # Reusable UI components
│ ├── services/ # API calls (Axios)
│ ├── context/ # Auth state
│ ├── App.js
│ └── index.js
├── Dockerfile
└── package.json

---

## 2. Environment Variables

### Backend (.env)
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- JWT_SECRET
- JWT_EXPIRES_IN
- PORT
- FRONTEND_URL

---

## 3. Development Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

---

## 4. Running the Application

### Using Docker (Recommended)

docker-compose up -d --build

### Services
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/health

---

## 5. Database Migrations & Seeds

- Migrations run automatically on backend startup
- Seed data is loaded automatically
- No manual DB commands required

---

## 6. Authentication Flow

- User logs in
- Backend validates credentials
- JWT token is generated
- Token is sent with every API request
- RBAC middleware checks permissions

---

## 7. Error Handling

- Centralized error middleware
- Consistent API response format
- Proper HTTP status codes

---

## 8. Deployment Notes

- All services are containerized
- Fixed ports used for evaluation
- One-command startup supported

---

## 9. Conclusion

This technical specification defines the internal structure and setup required to build, run, and evaluate the multi-tenant SaaS platform successfully.

