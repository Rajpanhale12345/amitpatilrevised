// db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load local .env (Railway will ignore this automatically)
dotenv.config();

// Support BOTH:
// - Local development: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
// - Railway MySQL: MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE

const DB_HOST =
  process.env.MYSQLHOST ||  // Railway
  process.env.DB_HOST ||    // Local
  "localhost";

const DB_PORT =
  Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306);

const DB_USER =
  process.env.MYSQLUSER ||
  process.env.DB_USER ||
  "root";

const DB_PASSWORD =
  process.env.MYSQLPASSWORD ??
  process.env.DB_PASSWORD ??
  "";

const DB_NAME =
  process.env.MYSQLDATABASE ||
  process.env.DB_NAME ||
  "portfolio";

// Safety check
if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error("❌ Missing required DB env variables.");
}

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
});

export default pool;
