# API Documentation

## Auth
- POST /api/auth/login

## Tenants
- POST /api/tenants/register
- GET /api/tenants/:tenantId

## Users
- POST /api/tenants/:tenantId/users
- GET /api/tenants/:tenantId/users
- PUT /api/users/:userId
- DELETE /api/users/:userId

## Projects
- POST /api/projects
- GET /api/projects
- PUT /api/projects/:projectId
- DELETE /api/projects/:projectId

## Tasks
- POST /api/projects/:projectId/tasks
- GET /api/projects/:projectId/tasks
- PUT /api/tasks/:taskId
- PATCH /api/tasks/:taskId/status
- DELETE /api/tasks/:taskId
