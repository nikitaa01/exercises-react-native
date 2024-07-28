import { Text } from "react-native";

export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <Text className="text-[48px] font-extrabold mb-2 text-primary-500">
        {title}
      </Text>
      <Text className="text-lg text-white font-bold mb-8">{description}</Text>
    </>
  );
}
