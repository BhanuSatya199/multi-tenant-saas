
# Product Requirements Document (PRD)
## Multi-Tenant SaaS Platform – Project & Task Management

---

## 1. Overview

This document defines the product requirements for a multi-tenant SaaS platform that allows multiple organizations (tenants) to manage users, projects, and tasks independently. The system ensures strict tenant data isolation, role-based access control, and subscription plan enforcement.

---

## 2. User Personas

### 2.1 Super Admin
**Role Description:** System-level administrator with access to all tenants.  
**Responsibilities:**
- Manage all tenants
- Update subscription plans and limits
- Monitor system usage

**Goals:**
- Ensure platform stability
- Maintain tenant compliance

**Pain Points:**
- Need global visibility
- Risk of misconfiguration

---

### 2.2 Tenant Admin
**Role Description:** Administrator of a single organization.  
**Responsibilities:**
- Manage users within tenant
- Create and manage projects
- Enforce internal workflows

**Goals:**
- Efficient team collaboration
- Control access and permissions

**Pain Points:**
- Subscription limits
- User onboarding friction

---

### 2.3 End User
**Role Description:** Regular team member.  
**Responsibilities:**
- View and update tasks
- Collaborate on projects

**Goals:**
- Clear task visibility
- Easy task updates

**Pain Points:**
- Limited permissions
- Task overload

---

## 3. Functional Requirements

**Auth Module**
- FR-001: The system shall allow tenant registration with a unique subdomain.
- FR-002: The system shall authenticate users using JWT tokens.
- FR-003: The system shall enforce 24-hour token expiry.

**Tenant Module**
- FR-004: The system shall allow super_admin to view all tenants.
- FR-005: The system shall allow tenant_admin to update tenant name only.
- FR-006: The system shall enforce tenant status checks during login.

**User Module**
- FR-007: The system shall allow tenant_admin to create users.
- FR-008: The system shall enforce per-tenant email uniqueness.
- FR-009: The system shall prevent tenant_admin from deleting themselves.

**Project Module**
- FR-010: The system shall allow project creation within tenant limits.
- FR-011: The system shall list projects filtered by tenant.
- FR-012: The system shall allow project updates by owner or tenant_admin.

**Task Module**
- FR-013: The system shall allow tasks to be created within projects.
- FR-014: The system shall allow task assignment to tenant users.
- FR-015: The system shall allow any tenant user to update task status.

---

## 4. Non-Functional Requirements

- NFR-001 (Performance): 90% of API responses < 200ms.
- NFR-002 (Security): All passwords must be hashed.
- NFR-003 (Scalability): Support at least 100 concurrent users.
- NFR-004 (Availability): Target 99% uptime.
- NFR-005 (Usability): UI must be responsive on mobile and desktop.

---

## 5. Assumptions & Constraints

- Users access the platform via web browser.
- Docker is mandatory for deployment.
- PostgreSQL is the primary database.

---

## 6. Success Metrics

- Successful tenant isolation
- All APIs secured with RBAC
- One-command Docker startup

