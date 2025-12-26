
# API Documentation
## Multi-Tenant SaaS Platform

---

## Authentication APIs

### API 1: Register Tenant
- Method: POST
- Endpoint: /api/auth/register-tenant
- Auth: Public
- Body:
{
  "tenantName": "Demo Company",
  "subdomain": "demo",
  "adminEmail": "admin@demo.com",
  "adminPassword": "Demo@123",
  "adminFullName": "Demo Admin"
}
- Response: 201 Created

---

### API 2: Login
- Method: POST
- Endpoint: /api/auth/login
- Auth: Public
- Body:
{
  "email": "admin@demo.com",
  "password": "Demo@123",
  "tenantSubdomain": "demo"
}
- Response: JWT token

---

### API 3: Get Current User
- Method: GET
- Endpoint: /api/auth/me
- Auth: Required
- Header: Authorization: Bearer <token>

---

### API 4: Logout
- Method: POST
- Endpoint: /api/auth/logout
- Auth: Required

---

## Tenant Management APIs

### API 5: Get Tenant Details
- Method: GET
- Endpoint: /api/tenants/:tenantId
- Auth: tenant_admin / super_admin

---

### API 6: Update Tenant
- Method: PUT
- Endpoint: /api/tenants/:tenantId
- Auth: tenant_admin / super_admin

---

### API 7: List All Tenants
- Method: GET
- Endpoint: /api/tenants
- Auth: super_admin

---

## User Management APIs

### API 8: Add User
- Method: POST
- Endpoint: /api/tenants/:tenantId/users
- Auth: tenant_admin

---

### API 9: List Users
- Method: GET
- Endpoint: /api/tenants/:tenantId/users
- Auth: Authenticated

---

### API 10: Update User
- Method: PUT
- Endpoint: /api/users/:userId
- Auth: tenant_admin / self

---

### API 11: Delete User
- Method: DELETE
- Endpoint: /api/users/:userId
- Auth: tenant_admin

---

## Project Management APIs

### API 12: Create Project
- Method: POST
- Endpoint: /api/projects
- Auth: Authenticated

---

### API 13: List Projects
- Method: GET
- Endpoint: /api/projects
- Auth: Authenticated

---

### API 14: Update Project
- Method: PUT
- Endpoint: /api/projects/:projectId
- Auth: tenant_admin / owner

---

### API 15: Delete Project
- Method: DELETE
- Endpoint: /api/projects/:projectId
- Auth: tenant_admin / owner

---

## Task Management APIs

### API 16: Create Task
- Method: POST
- Endpoint: /api/projects/:projectId/tasks
- Auth: Authenticated

---

### API 17: List Tasks
- Method: GET
- Endpoint: /api/projects/:projectId/tasks
- Auth: Authenticated

---

### API 18: Update Task Status
- Method: PATCH
- Endpoint: /api/tasks/:taskId/status
- Auth: Authenticated

---

### API 19: Update Task
- Method: PUT
- Endpoint: /api/tasks/:taskId
- Auth: Authenticated

---

## Common Response Format
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}



---

## Authentication Notes

- JWT tokens must be sent in the Authorization header as:
  Authorization: Bearer <token>
- Tokens expire after 24 hours.
- If token is missing or expired, API returns 401 Unauthorized.

---

## Authorization Rules

- super_admin can access all tenants.
- tenant_admin can manage users, projects, and tasks within their tenant.
- regular users can view and update tasks assigned to them.
- tenant_admin cannot delete themselves.

---

## Error Responses

- 400 Bad Request: Validation errors
- 401 Unauthorized: Invalid or missing token
- 403 Forbidden: Access denied
- 404 Not Found: Resource not found
- 409 Conflict: Duplicate data

---

## Subscription Enforcement

- User creation checks max_users limit.
- Project creation checks max_projects limit.
- If limit reached, API returns 403 Forbidden.

---

## Audit Logging

All CREATE, UPDATE, DELETE operations are logged in the audit_logs table with:
- tenant_id
- user_id
- action
- entity_type
- entity_id
- timestamp

---

## Health Check API

### GET /api/health
- Purpose: Verify system readiness
- Response:
{
  "status": "ok",
  "database": "connected"
}

---

## API Security Best Practices

- Input validation on all endpoints
- No sensitive data returned in responses
- Consistent response format
- Tenant isolation enforced in all queries

---

## Conclusion

This API documentation covers all required endpoints, security rules, and operational behavior necessary to evaluate and test the multi-tenant SaaS platform.

