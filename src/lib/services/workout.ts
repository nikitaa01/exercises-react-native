import { and, eq, sql } from "drizzle-orm";
import { db } from "../db/client";
import type { Exercise, Routine, Workout } from "../db/scheme";
import { exercise, routine, workout } from "../db/scheme";
import { getNextRoutine } from "./routine";

type WorkoutRoutineExercises = {
  workout: Workout;
  routine: Routine;
  exercises: Exercise[];
};

export const getCurrentWorkout = (): WorkoutRoutineExercises | false => {
  try {
    const workoutsRoutinesExercises = db
      .select()
      .from(workout)
      .leftJoin(routine, eq(routine.id, workout.routineId))
      .leftJoin(exercise, eq(exercise.routineId, routine.id))
      .where(sql`workout.completed_at IS NULL`)
      .all();

    const workoutRoutineExercises: WorkoutRoutineExercises = {
      workout: workoutsRoutinesExercises[0].workout,
      routine: workoutsRoutinesExercises[0].routine,
      exercises: workoutsRoutinesExercises
        .map(({ exercise }) => exercise)
        .filter(Boolean),
    } as WorkoutRoutineExercises;

    if (!workoutRoutineExercises.routine) {
      return false;
    }
    return workoutRoutineExercises;
  } catch {
    return false;
  }
};

export const completeWorkout = () => {
  try {
    const currentWorkout = getCurrentWorkout();
    if (!currentWorkout) {
      return false;
    }
    db.update(workout)
      .set({ completedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(workout.id, currentWorkout.workout.id))
      .execute();

    const nextRoutine = getNextRoutine(currentWorkout.routine.id);

    db.insert(workout)
      .values({
        routineId: nextRoutine.id,
      })
      .execute();
    return true;
  } catch {
    return false;
  }
};

export const getLastCompletedWorkoutByRoutine = (routineId: number) => {
  try {
    return db
      .select()
      .from(workout)
      .where(
        and(
          sql`workout.completed_at IS NOT NULL`,
          eq(workout.routineId, routineId),
        ),
      )
      .orderBy(sql`workout.completed_at DESC`)
      .limit(1)
      .get();
  } catch {
    return false;
  }
};
