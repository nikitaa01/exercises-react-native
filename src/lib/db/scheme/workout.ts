import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { routine } from "./routine";

export const workout = sqliteTable("workout", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  routineId: integer("routine_id").references(() => routine.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  completedAt: integer("completed_at"),
});

export type Workout = typeof workout.$inferSelect;
