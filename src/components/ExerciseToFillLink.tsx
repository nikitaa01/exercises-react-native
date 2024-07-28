import type { Exercise } from "@/lib/db/scheme";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface ExerciseToFillLinkProps {
  exercise: Exercise;
  workoutId: number;
}

export default function ExerciseToFillLink({
  exercise,
  workoutId,
}: ExerciseToFillLinkProps) {
  return (
    <View className="rounded-lg my-4 flex-1 pl-2">
      <Link
        href={{
          pathname: "/fill-exercise/[exerciseId]/[workoutId]",
          params: { workoutId, exerciseId: exercise.id },
        }}
        asChild
      >
        <Pressable className="p-4 bg-gray-800 border border-gray-700 rounded-lg flex-col flex-1 justify-center gap-2 active:opacity-75">
          <Text className="text-xl font-bold text-white">{exercise.name}</Text>
          <Text className="text-sm text-gray-400 pb-2">
            {exercise.muscleGroup}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
