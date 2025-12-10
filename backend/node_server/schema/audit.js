import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const audit = pgTable("audit", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    auditType: text("audit_type").notNull(),     // text / file
    inputText: text("input_text"),               // for text audit
    fileUrl: text("file_url"),                   // for file audit
    status: text("status").default("pending"),
    result: text("result"),
    createdAt: timestamp("created_at").defaultNow(),
});
