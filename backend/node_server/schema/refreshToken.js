import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const refreshTokens = pgTable("refresh_tokens", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    token: varchar("token", { length: 500 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});