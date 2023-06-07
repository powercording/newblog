import {
  mysqlTable,
  int,
  varchar,
  datetime,
  uniqueIndex,
  tinyint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
export const user = mysqlTable(
  "User",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    email: varchar("email", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    avatar: varchar("avatar", { length: 191 }),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
    updatedAt: datetime("updatedAt", { mode: "string", fsp: 3 }).notNull(),
    vaild: tinyint("vaild").default(0),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("User_email_key").on(table.email),
      nameKey: uniqueIndex("User_name_key").on(table.name),
    };
  }
);
