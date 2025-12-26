# Multi-Tenant SaaS Platform

Production-ready multi-tenant SaaS application for project & task management with strict tenant isolation, RBAC, JWT authentication, and Dockerized deployment.

## Features
- Multi-tenant architecture with tenant isolation
- JWT authentication (24h expiry)
- Role-based access control (super_admin, tenant_admin, user)
- Subscription limits (users & projects)
- Projects & tasks management
- Audit logging
- Fully Dockerized (DB, Backend, Frontend)
- One-command startup

## Tech Stack
- Backend: Node.js, Express, PostgreSQL, JWT, bcrypt
- Frontend: React, Axios, React Router
- DevOps: Docker, docker-compose

## Architecture
See docs/architecture.md

## Setup
```bash
docker-compose up -d --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/health

## API
See docs/API.md
