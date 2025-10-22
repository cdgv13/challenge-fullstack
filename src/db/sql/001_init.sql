-- ================================================================
-- 📘 Inicialización de tablas para el reto Fullstack Staff Engineer
-- ================================================================

-- 📨 Tabla principal de mensajes únicos
CREATE TABLE IF NOT EXISTS messages (
  message_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL  -- Se llena automáticamente
);

-- 📊 Tabla para el conteo de mensajes por hora y cuenta
CREATE TABLE IF NOT EXISTS counts (
  account_id TEXT NOT NULL,
  datetime TIMESTAMPTZ NOT NULL,
  count_messages INTEGER DEFAULT 0,
  UNIQUE (account_id, datetime)
);
