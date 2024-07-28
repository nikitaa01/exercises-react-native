import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { routine } from "./routine";

export const workout = sqliteTable("workout", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  routineId: integer("routine_id").references(() => routine.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  completedAt: text("completed_at"),
});

export type Workout = typeof workout.$inferSelect;
