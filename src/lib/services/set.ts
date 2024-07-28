import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { set } from "../db/scheme";
import { getLastCompletedWorkoutByRoutine } from "./workout";

export const getWorkoutExerciseSets = (
  workoutId: number,
  exerciseId: number,
) => {
  return db
    .select()
    .from(set)
    .where(and(eq(set.workoutId, workoutId), eq(set.exerciseId, exerciseId)))
    .orderBy(desc(set.createdAt));
};

export const createSet = (setData: typeof set.$inferInsert) => {
  return db.insert(set).values(setData).execute();
};

export const updateRepOrWeightOfSet = (
  setId: number,
  data: { reps: number; weight?: number } | { reps?: number; weight: number },
) => {
  return db.update(set).set(data).where(eq(set.id, setId)).execute();
};

export const deleteSet = (setId: number) => {
  return db.delete(set).where(eq(set.id, setId)).execute();
};

export const getLastWorkoutExerciseSets = (
  exerciseId: number,
  routineId: number,
) => {
  const lastCompletedWorkout = getLastCompletedWorkoutByRoutine(routineId);

  if (!lastCompletedWorkout) {
    return [];
  }

  return db
    .select()
    .from(set)
    .where(
      and(
        eq(set.workoutId, lastCompletedWorkout.id),
        eq(set.exerciseId, exerciseId),
      ),
    )
    .orderBy(asc(set.createdAt))
    .all();
};
