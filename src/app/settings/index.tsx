import PageHeader from "@/components/PageHeader";
import { Link } from "expo-router";
import { useRef } from "react";
import { FlatList, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Settings() {
  const { current: items } = useRef([
    {
      name: "Exportar",
      icon: "upload",
      href: "/settings/export",
    },
    {
      name: "Importar",
      icon: "download",
      href: "/settings/import",
    },
  ]);

  return (
    <>
      <PageHeader title="Ajustes" description="Ajustes del programa" />
      <FlatList
        data={items}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => (
          <Link href={item.href} asChild>
            <Pressable className="flex-row items-center p-4 rounded-lg bg-gray-800 border border-gray-700 my-2 active:opacity-75">
              <Icon name={item.icon} size={25} color="white" />
              <Text className="ml-4 text-lg text-white">{item.name}</Text>
            </Pressable>
          </Link>
        )}
      />
    </>
  );
}
