import { gt } from "drizzle-orm";
import { db } from "../db/client";
import { Routine, routine } from "../db/scheme";

export const getNextRoutine = (routineId: number): Routine => {
  const nextRoutine = db
    .select()
    .from(routine)
    .where(gt(routine.id, routineId))
    .orderBy(routine.id)
    .limit(1)
    .get();

  if (!nextRoutine) {
    return db
      .select()
      .from(routine)
      .orderBy(routine.id)
      .limit(1)
      .get() as Routine;
  }
  return nextRoutine;
};
