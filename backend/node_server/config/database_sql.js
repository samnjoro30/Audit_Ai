
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from '../schema/index.js';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {schema});

(async () => {
    try {
      await sql`SELECT 1`;
      console.log("✅ PostgreSQL (Neon) connected successfully");
    } catch (err) {
      console.error("❌ Neon DB connection failed:", err);
      process.exit(1); // stop server if DB is down
    }
  })();
