import IncrementableInput from "@/components/IncrementableInput";
import PrimaryButton from "@/components/PrimaryButton";
import { Set } from "@/lib/db/scheme";
import { deleteSet, updateRepOrWeightOfSet } from "@/lib/services/set";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import IconAntd from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Feather";

interface UpdateCardProps {
  set: Set;
  index: number;
  lastSet?: Set;
  defaultWeight: string;
  defaultReps: string;
}

export default function UpdateCard({
  set,
  index,
  lastSet,
  defaultWeight,
  defaultReps,
}: UpdateCardProps) {
  const [weight, setWeight] = useState(defaultWeight);
  const [reps, setReps] = useState(defaultReps);

  const weightBetter = lastSet ? set.weight > lastSet.weight : true;

  const repsBetter = lastSet ? set.reps > lastSet.reps : true;

  const handleUpdate = () => {
    if (!weight && !reps) {
      return;
    }
    updateRepOrWeightOfSet(set.id, {
      reps: Number(reps),
      weight: Number(weight),
    });
  };

  const handleDelete = () => {
    deleteSet(set.id);
  };

  return (
    <View className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-8">
      <Text className="text-white text-2xl font-extrabold">Serie #{index}</Text>
      <View className="flex-row justify-between my-2">
        <View className="gap-1 flex-1 mr-2">
          <Text className="text-gray-400 ">Peso (kg):</Text>
          <IncrementableInput value={weight} setValue={setWeight} step={0.5} />
          {set.weight - (lastSet?.weight ?? 0) === 0 ? (
            <View className="rotate-90 w-5">
              <IconAntd name="pause" color="#9ca3af" size={18} />
            </View>
          ) : !weightBetter ? (
            <View className="flex-row items-center">
              <Icon name="arrow-down" color="#ef4444" size={18} />
              <Text className="ml-2 text-red-500 font-bold">
                {(lastSet?.weight ?? 0) - set.weight} KG
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Icon name="arrow-up" color="#22c55e" size={18} />
              <Text className="ml-2 text-green-500 font-bold">
                {set.weight - (lastSet?.weight ?? 0)} KG
              </Text>
            </View>
          )}
        </View>
        <View className="gap-1 flex-1 ml-2">
          <Text className="text-gray-400 ">Repeticiones:</Text>
          <IncrementableInput value={reps} setValue={setReps} />
          {set.reps - (lastSet?.reps ?? 0) === 0 ? (
            <View className="rotate-90 w-5">
              <IconAntd name="pause" color="#9ca3af" size={18} />
            </View>
          ) : !repsBetter ? (
            <View className="flex-row items-center">
              <Icon name="arrow-down" color="#ef4444" size={18} />
              <Text className="ml-2 text-red-500 font-bold">
                {(lastSet?.reps ?? 0) - set.reps} Reps
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Icon name="arrow-up" color="#22c55e" size={18} />
              <Text className="ml-2 text-green-500 font-bold">
                {set.reps - (lastSet?.reps ?? 0)} Reps
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="flex-1 flex-row">
        <PrimaryButton onPress={handleUpdate} style={{ flex: 1 }}>
          <Text className="text-white text-center font-bold text-lg flex-1">
            Actualizar
          </Text>
        </PrimaryButton>
        <View className="p-[0.5]">
          <Pressable
            onPress={handleDelete}
            className="bg-red-500 p-2 rounded-lg mt-2 active:opacity-75 justify-center items-center ml-4"
          >
            <Icon name="trash-2" color="white" size={25} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
