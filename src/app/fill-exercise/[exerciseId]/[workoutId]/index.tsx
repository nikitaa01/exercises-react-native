import PageHeader from "@/components/PageHeader";
import { getExerciseById } from "@/lib/services/exercises";
import {
  getLastWorkoutExerciseSets,
  getWorkoutExerciseSets,
} from "@/lib/services/set";
import { getCurrentWorkout } from "@/lib/services/workout";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { ScrollView, View } from "react-native";
import CreateCard from "./components/CreateCard";
import UpdateCard from "./components/UpdateCard";

export default function Page() {
  const { exerciseId, workoutId } = useLocalSearchParams();
  const { current: workout } = useRef(getCurrentWorkout());
  const { data: sets } = useLiveQuery(
    getWorkoutExerciseSets(Number(workoutId), Number(exerciseId)),
  );

  const { current: lastSets } = useRef(
    getLastWorkoutExerciseSets(
      Number(exerciseId),
      workout ? Number(workout.routine.id) : -0,
    ),
  );

  const { current: currentExercise } = useRef(
    getExerciseById(Number(exerciseId)),
  );

  if (!currentExercise) {
    return <Redirect href="/not-found" />;
  }

  return (
    <View className="flex-1">
      <PageHeader
        title={currentExercise.name}
        description={currentExercise.muscleGroup}
      />
      <ScrollView className="pb-8 flex-1">
        <CreateCard
          index={sets.length + 1}
          exerciseId={Number(exerciseId)}
          workoutId={Number(workoutId)}
          lastWorkoutWeight={
            lastSets.length
              ? lastSets[sets?.length ?? 0]?.weight?.toString()
              : ""
          }
          lastWorkoutReps={
            lastSets.length ? lastSets[sets?.length ?? 0]?.reps?.toString() : ""
          }
        />
        {sets.map((set, index) => (
          <UpdateCard
            key={Math.random()}
            set={set}
            index={sets.length - index}
            defaultWeight={set.weight.toString()}
            defaultReps={set.reps.toString()}
          />
        ))}
      </ScrollView>
    </View>
  );
}
