import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { exercise } from "./exercise";
import { workout } from "./workout";

export const set = sqliteTable("set", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  exerciseId: integer("exercise_id").references(() => exercise.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  workoutId: integer("workout_id").references(() => workout.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  weight: integer("weight").notNull(),
  reps: integer("reps").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Set = typeof set.$inferSelect;
