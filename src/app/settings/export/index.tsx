import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { getExportData } from "@/lib/services";
import { useRef } from "react";
import { ScrollView, Share, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Export() {
  const exportDataRef = useRef(getExportData());

  const handleShare = async () => {
    await Share.share({
      message: JSON.stringify(exportDataRef.current, null, 2),
    });
  };

  return (
    <>
      <PageHeader
        title="Exportar"
        description="Exporte los datos en formato JSON"
      />
      <ScrollView className="flex-1">
        <Text className="text-white">
          {JSON.stringify(exportDataRef.current, null, 2)}
        </Text>
      </ScrollView>
      <PrimaryButton onPress={handleShare}>
        <View className="flex-row gap-2 justify-center items-center">
          <Icon name="share" size={25} color="white" />
          <Text className="text-white text-center font-bold text-lg">
            Compartir
          </Text>
        </View>
      </PrimaryButton>
    </>
  );
}
