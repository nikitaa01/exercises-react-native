import type { Dispatch, SetStateAction } from "react";
import { Pressable, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

interface IncrementableInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  step?: number;
}

export default function IncrementableInput({
  value,
  setValue,
  step = 1,
}: IncrementableInputProps) {
  return (
    <View className="flex-row bg-gray-600 rounded-lg m-1">
      <Pressable
        className="px-4 py-2 items-center justify-center border-r border-gray-700 active:opacity-75"
        onPress={() => {
          if (Number(value) < step) return;
          setValue((prev) => String(Number(prev) - step));
        }}
      >
        <Icon name="minus" color="white" size={16} />
      </Pressable>
      <TextInput
        keyboardType="numeric"
        className="text-white p-2 flex-1 text-center"
        value={value}
        onChange={(e) => setValue(e.nativeEvent.text)}
      />
      <Pressable
        className="px-4 py-2 items-center justify-center border-l border-gray-700 active:opacity-75"
        onPress={() => setValue((prev) => String(Number(prev) + step))}
      >
        <Icon name="plus" color="white" size={16} />
      </Pressable>
    </View>
  );
}
