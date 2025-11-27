// Local-only MySQL pool (no SSL, no DATABASE_URL)
import mysql from "mysql2/promise";

const {
  DB_HOST = "localhost",
  DB_PORT = "3306",
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "portfolio",
} = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error("❌ DB_HOST/DB_USER/DB_NAME missing in .env");
}

const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: "panhaleraj003",
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
});

export default pool;
