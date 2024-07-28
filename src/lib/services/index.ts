import { sql } from "drizzle-orm";
import { db } from "../db/client";
import {
  Exercise,
  exercise,
  Routine,
  routine,
  Set,
  set,
  Workout,
  workout,
} from "../db/scheme";

export const getExportData = () => {
  const exercises = db.select().from(exercise).all();
  const routines = db.select().from(routine).all();
  const sets = db.select().from(set).all();
  const workouts = db.select().from(workout).all();

  return {
    exercises,
    routines,
    sets,
    workouts,
  };
};

export const importData = ({
  exercises,
  routines,
  sets,
  workouts,
}: {
  exercises: Exercise[];
  routines: Routine[];
  sets: Set[];
  workouts: Workout[];
}) => {
  db.delete(exercise)
    .where(sql`1 = 1`)
    .run();
  db.delete(routine)
    .where(sql`1 = 1`)
    .run();
  db.delete(set)
    .where(sql`1 = 1`)
    .run();
  db.delete(workout)
    .where(sql`1 = 1`)
    .run();

  exercises.length > 0 && db.insert(exercise).values(exercises).run();
  routines.length > 0 && db.insert(routine).values(routines).run();
  sets.length > 0 && db.insert(set).values(sets).run();
  workouts.length > 0 && db.insert(workout).values(workouts).run();
};
