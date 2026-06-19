-- Region migration: products keyed by (pid, region) so the same product can
-- exist in both the US and EU catalogs; existing rows become region 'US'.
-- Run from cj-proxy/:
--   npx wrangler d1 execute ali-catalog --remote --file ./migrate-region.sql
-- (Verify the products schema matches before running — see notes.)

ALTER TABLE products RENAME TO products_old;

CREATE TABLE products (
  pid          TEXT NOT NULL,
  region       TEXT NOT NULL DEFAULT 'US',
  name         TEXT,
  price        REAL,
  cost         REAL,
  image        TEXT,
  sku          TEXT,
  category     TEXT,
  us_stock     INTEGER,
  hidden       INTEGER DEFAULT 0,
  season_score INTEGER,
  variants     TEXT,
  synced_at    TEXT,
  PRIMARY KEY (pid, region)
);

INSERT INTO products
  (pid, region, name, price, cost, image, sku, category, us_stock, hidden, season_score, variants, synced_at)
SELECT
  pid, 'US', name, price, cost, image, sku, category, us_stock, hidden, season_score, variants, synced_at
FROM products_old;

DROP TABLE products_old;

CREATE INDEX IF NOT EXISTS idx_products_region_cat ON products (region, category);

-- Orders carry their region so fulfillment ships from the right warehouse.
ALTER TABLE orders ADD COLUMN region TEXT DEFAULT 'US';
