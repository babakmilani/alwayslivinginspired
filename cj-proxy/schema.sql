-- D1 catalog for alwayslivinginspired curation system
-- Apply: npx wrangler d1 execute ali-catalog --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS products (
  pid          TEXT PRIMARY KEY,   -- CJ product id
  name         TEXT,
  price        REAL,               -- retail (cost x markup)
  cost         REAL,               -- CJ cost
  image        TEXT,
  sku          TEXT,
  category     TEXT,               -- CJ leaf category name
  us_stock     INTEGER,            -- filled later by stock sync (nullable)
  hidden       INTEGER NOT NULL DEFAULT 0,  -- 0 = visible, 1 = hidden in admin
  season_score INTEGER,            -- filled later by the AI seasonal pass (nullable)
  synced_at    TEXT
);

CREATE INDEX IF NOT EXISTS idx_products_hidden ON products(hidden);
CREATE INDEX IF NOT EXISTS idx_products_synced ON products(synced_at);
