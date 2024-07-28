import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { routine } from "./routine";

export const exercise = sqliteTable("exercise", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imgUrl: text("img_url"),
  muscleGroup: text("muscle_group").notNull(),
  routineId: integer("routine_id").references(() => routine.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});

export type Exercise = typeof exercise.$inferSelect;
