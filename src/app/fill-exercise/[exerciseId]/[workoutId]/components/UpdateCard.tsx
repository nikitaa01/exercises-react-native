import PrimaryButton from "@/components/PrimaryButton";
import { Set } from "@/lib/db/scheme";
import { deleteSet, updateRepOrWeightOfSet } from "@/lib/services/set";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface UpdateCardProps {
  set: Set;
  index: number;
  defaultWeight: string;
  defaultReps: string;
}

export default function UpdateCard({
  set,
  index,
  defaultWeight,
  defaultReps,
}: UpdateCardProps) {
  const [weight, setWeight] = useState(defaultWeight);
  const [reps, setReps] = useState(defaultReps);

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
