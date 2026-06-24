-- Email subscribers (for the welcome-coupon flow + future campaigns).
-- Run from cj-proxy/:
--   npx wrangler d1 execute ali-catalog --remote --file ./migrate-subscribers.sql
CREATE TABLE IF NOT EXISTS subscribers (
  email      TEXT PRIMARY KEY,
  source     TEXT,                              -- where they signed up (site, youtube, instagram…)
  created_at TEXT DEFAULT (datetime('now'))
);
