import Database from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const betterSqlite = new Database(process.env.DB_PATH);
const db = drizzle(betterSqlite);

migrate(db, { migrationsFolder: "drizzle" });
