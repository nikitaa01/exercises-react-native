import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { exercise } from "../db/scheme";

export const getExerciseById = (exerciseId: number) =>
  db
    .select()
    .from(exercise)
    .where(eq(exercise.id, Number(exerciseId)))
    .limit(1)
    .get();
