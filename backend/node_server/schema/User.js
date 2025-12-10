import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  companyname: varchar("companyname", { length: 255 }),
  phonenumber: varchar("phonenumber", { length: 20 }),
  password: varchar("password", { length: 255 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
});
