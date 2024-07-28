import useSeed from "@/hooks/useSeed";
import { db } from "@/lib/db/client";
import migrations from "@/lib/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Link, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function RootLayout() {
  const migration = useMigrations(db, migrations);
  const seeding = useSeed(!migration.success);

  const pathname = usePathname();

  if (seeding) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "rgb(31 41 55)",
          },
          contentStyle: {
            backgroundColor: "rgb(17 24 39)",
            paddingHorizontal: 32,
            paddingVertical: 16,
          },
          title: "",
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable className="justify-center items-center active:opacity-75 ml-auto">
                <Icon name="setting" color="white" size={25} />
              </Pressable>
            </Link>
          ),
          headerLeft: () =>
            pathname !== "/" && (
              <Link href="../" asChild>
                <Pressable className="justify-center items-center active:opacity-75">
                  <Icon name="left" color="white" size={25} />
                </Pressable>
              </Link>
            ),
        }}
      />
    </View>
  );
}
