import {
  mysqlTable,
  index,
  int,
  varchar,
  text,
  datetime,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const post = mysqlTable(
  "Post",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    title: varchar("title", { length: 191 }).notNull(),
    content: text("content").notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
    userName: varchar("userName", { length: 191 }).notNull(),
  },
  (table) => {
    return {
      userNameIdIdx: index("Post_userName_id_idx").on(table.userName, table.id),
    };
  }
);
