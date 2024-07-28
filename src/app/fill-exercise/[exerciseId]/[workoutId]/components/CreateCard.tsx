import PrimaryButton from "@/components/PrimaryButton";
import { set } from "@/lib/db/scheme";
import { createSet } from "@/lib/services/set";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface CreateCardProps {
  index: number;
  workoutId: number;
  exerciseId: number;
  lastWorkoutWeight?: string;
  lastWorkoutReps?: string;
}

export default function CreateCard({
  index,
  workoutId,
  exerciseId,
  lastWorkoutWeight = "",
  lastWorkoutReps = "",
}: CreateCardProps) {
  const [weight, setWeight] = useState(lastWorkoutWeight);
  const [reps, setReps] = useState(lastWorkoutReps);

  useEffect(() => {
    setWeight(lastWorkoutWeight);
    setReps(lastWorkoutReps);
  }, [lastWorkoutWeight, lastWorkoutReps]);

  const handleCreateSet = () => {
    if (!weight || !reps) {
      return;
    }
    const setData: typeof set.$inferInsert = {
      exerciseId,
      workoutId,
      reps: Number(reps),
      weight: Number(weight),
    };
    createSet(setData);
  };

  return (
    <View className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <Text className="text-white text-2xl font-extrabold">Serie #{index}</Text>
      <View className="flex-row justify-between my-2">
        <View className="gap-1 flex-1 mr-2">
          <Text className="text-gray-400 ">Peso (kg):</Text>
          <View className="flex-row bg-gray-600 rounded-lg">
            <TextInput
              keyboardType="numeric"
              className="text-white p-2 flex-1"
              value={weight}
              onChange={(e) => setWeight(e.nativeEvent.text)}
            />
          </View>
        </View>
        <View className="gap-1 flex-1 ml-2">
          <Text className="text-gray-400 ">Repeticiones:</Text>
          <View className="flex-row bg-gray-600 rounded-lg">
            <TextInput
              keyboardType="numeric"
              className="text-white p-2 flex-1"
              value={reps}
              onChange={(e) => setReps(e.nativeEvent.text)}
            />
          </View>
        </View>
      </View>
      <PrimaryButton onPress={handleCreateSet}>
        <Text className="text-white text-center font-bold text-lg">
          Guardar
        </Text>
      </PrimaryButton>
    </View>
  );
}
