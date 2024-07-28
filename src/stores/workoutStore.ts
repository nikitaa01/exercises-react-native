import { Exercise, Routine, Workout } from "@/lib/db/scheme";
import { completeWorkout, getCurrentWorkout } from "@/lib/services/workout";
import { create } from "zustand";

interface WorkoutStore {
  workout: Workout | null;
  routine: Routine | null;
  exercises: Exercise[];
  actions: {
    refetch: () => void;
    completeWorkout: () => void;
  };
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => {
  const currentWorkout = getCurrentWorkout() || {
    workout: null,
    routine: null,
    exercises: [],
  };

  return {
    ...currentWorkout,
    actions: {
      refetch: () => {
        const currentWorkout = getCurrentWorkout();
        if (currentWorkout === false) return;
        set(currentWorkout);
      },
      completeWorkout: () => {
        completeWorkout();
        get().actions.refetch();
      },
    },
  };
});
