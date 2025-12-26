CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  user_id UUID,
  action VARCHAR NOT NULL,
  entity_type VARCHAR,
  entity_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
