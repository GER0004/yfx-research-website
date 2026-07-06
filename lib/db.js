import Database from "better-sqlite3";
import path from "path";

let _db;

function getDb() {
  if (_db) return _db;
  const dbPath = path.join(process.cwd(), "data", "early-access.db");
  _db = new Database(dbPath);
  _db.pragma("journal_mode = WAL");
  _db.exec(`
    CREATE TABLE IF NOT EXISTS early_access_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      ip_address TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  return _db;
}

export function insertRequest({ fullName, email, ip }) {
  const db = getDb();
  const stmt = db.prepare(
    "INSERT INTO early_access_requests (full_name, email, ip_address) VALUES (?, ?, ?)",
  );
  return stmt.run(fullName, email, ip || null);
}

export function getAllRequests() {
  const db = getDb();
  return db
    .prepare("SELECT * FROM early_access_requests ORDER BY created_at DESC")
    .all();
}

export function getRequestCount() {
  const db = getDb();
  return db
    .prepare("SELECT COUNT(*) as count FROM early_access_requests")
    .get().count;
}

export function emailExists(email) {
  const db = getDb();
  return !!db
    .prepare("SELECT 1 FROM early_access_requests WHERE email = ?")
    .get(email);
}
