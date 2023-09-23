import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const otps = sqliteTable("otps", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  otp: integer("otp").notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  vendor: text("vendor").default("Swiggy").notNull(),
  claimedBy: text("claimedBy"),
});
