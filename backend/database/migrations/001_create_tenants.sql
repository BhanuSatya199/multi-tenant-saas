CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  subdomain VARCHAR UNIQUE NOT NULL,
  status VARCHAR DEFAULT 'active',
  subscription_plan VARCHAR DEFAULT 'free',
  max_users INT DEFAULT 5,
  max_projects INT DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
