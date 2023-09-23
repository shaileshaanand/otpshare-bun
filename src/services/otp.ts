import { format, sub } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { gte } from "drizzle-orm";
import { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

import { otps } from "../db/schema";

export const getLast10minuteOtps = async (db: BunSQLiteDatabase) =>
  db
    .select()
    .from(otps)
    .where(
      gte(
        otps.createdAt,
        format(
          utcToZonedTime(
            sub(new Date(), {
              minutes: 10,
            }),
            "UTC"
          ),
          "yyyy-MM-dd HH:mm:ss"
        )
      )
    );
