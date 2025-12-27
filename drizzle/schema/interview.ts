import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { JobInfoTable } from "./jobInfo";
import { relations } from "drizzle-orm/relations";

export const InterviewTable = pgTable("interviews", {
    id,
    jobInfoId: uuid().references(() => JobInfoTable.id, { onDelete: "cascade" }).notNull(),
    duration: varchar().notNull(),
    humeChatId: varchar().notNull(),
    feedback: varchar(),
    createdAt,
    updatedAt,
});

export const interviewRelations = relations(InterviewTable, ({ one, many }) => ({
    jobInfo: one(JobInfoTable, {
        fields: [InterviewTable.jobInfoId],
        references: [JobInfoTable.id],
    }),
}));