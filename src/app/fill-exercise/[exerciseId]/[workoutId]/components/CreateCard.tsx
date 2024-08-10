import CircularProgressBar from "@/components/CircularProgress";
import IncrementableInput from "@/components/IncrementableInput";
import PrimaryButton from "@/components/PrimaryButton";
import useSetsRestTimer from "@/hooks/useSetsRestTimer";
import { Set, set } from "@/lib/db/scheme";
import { createSet } from "@/lib/services/set";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface CreateCardProps {
  index: number;
  workoutId: number;
  exerciseId: number;
  lastCurrentWorkoutSet?: Set;
  lastWorkoutWeight?: string;
  lastWorkoutReps?: string;
}

export default function CreateCard({
  index,
  workoutId,
  exerciseId,
  lastCurrentWorkoutSet: lastSet,
  lastWorkoutWeight = "",
  lastWorkoutReps = "",
}: CreateCardProps) {
  const [weight, setWeight] = useState(lastWorkoutWeight);
  const [reps, setReps] = useState(lastWorkoutReps);
  const timer = useSetsRestTimer(lastSet);

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

  const timerPercentage = timer && ((timer.m * 60 + timer.s) / 120) * 100;

  return (
    <View className="relative rounded-lg">
      <View className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <Text className="text-white text-2xl font-extrabold">
          Serie #{index}
        </Text>
        <View className="flex-row justify-between my-2">
          <View className="gap-1 flex-1 mr-2">
            <Text className="text-gray-400 ">Peso (kg):</Text>
            <IncrementableInput
              value={weight}
              setValue={setWeight}
              step={0.5}
            />
          </View>
          <View className="gap-1 flex-1 ml-2">
            <Text className="text-gray-400 ">Repeticiones:</Text>
            <IncrementableInput value={reps} setValue={setReps} />
          </View>
        </View>
        <PrimaryButton onPress={handleCreateSet}>
          <Text className="text-white text-center font-bold text-lg">
            Guardar
          </Text>
        </PrimaryButton>
      </View>
      {timer && (
        <View className="absolute rounded-lg border border-gray-700 bg-gray-800 h-full w-full p-4">
          <Text className="text-white text-2xl font-extrabold">
            Serie #{index} (Descanso)
          </Text>
          <View className="items-center justify-center flex-col flex-1 rounded-full relative aspect-squaremx-auto mt-4">
            <Text className="text-white text-center font-extrabold text-lg">
              {String(timer.m).padStart(2, "0")}:
              {String(timer.s).padStart(2, "0")}
            </Text>
            <CircularProgressBar
              className="absolute w-full h-full"
              percentage={100 - (timerPercentage ?? 0)}
            />
          </View>
        </View>
      )}
    </View>
  );
}
