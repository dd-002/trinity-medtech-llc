import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// IMPORTANT: Use process.cwd() to get the project root path for Vercel/Node environment.
// This path must be reliable during server execution.
const dbPath = path.join(process.cwd(), 'mydb.db');

// Use a single instance to prevent issues with multiple database connections/locks
let db = null; 

/**
 * Initializes and returns the SQLite database connection instance.
 * If the connection already exists, it returns the existing instance.
 * It also ensures the necessary 'users' table is created.
 */
export async function getDb() {
  if (db) {
    return db;
  }

  // Open the database connection
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Create the 'users' table if it doesn't exist. This acts as the schema initialization.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      smallDesc TEXT,
      largeDesc TEXT,
      brand TEXT,
      officialPage TEXT,
      imageLink TEXT,
      category TEXT
    );
  `);

  return db;
}