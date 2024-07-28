import { db } from "@/lib/db/client";
import { exercise } from "@/lib/db/scheme";
import seed from "@/lib/services/seed";
import { useWorkoutStore } from "@/stores/workoutStore";
import { useEffect, useState } from "react";

export default function useSeed(wait: boolean) {
  const [seeding, setSeeding] = useState(true);
  const refetch = useWorkoutStore((state) => state.actions.refetch);

  useEffect(() => {
    if (wait) return;
    try {
      const exercises = db.select().from(exercise).all();

      if (exercises.length === 0) {
        seed();
        refetch();
      }
      setSeeding(false);
    } catch {
      console.log("Error seeding");
    }
  }, [wait, refetch]);

  return seeding;
}
