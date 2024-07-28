import { PropsWithChildren } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

export default function PrimaryButton({
  children,
  onPress,
  style,
}: PropsWithChildren<{ onPress: () => void; style?: StyleProp<ViewStyle> }>) {
  return (
    <Pressable
      style={style}
      className="bg-primary-600 p-2 rounded-lg mt-2 active:opacity-75"
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
