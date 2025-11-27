import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, ScrollView, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styles";

import InformationAboutClinicComponent from "@/components/InformationAboutClinicComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import ChildrenService from "@/http/children";
import ClinicService from "@/http/clinic";
import type { ChildFull } from "@/http/types/childFull";
import type { ClinicResponse } from "@/http/types/clinic";
import type { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type ClinicRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.CHILDREN_INFORMATION_ABOUT_CLINIC>;

export default function ChildrenInformationAboutClinicScreen() {
  const route = useRoute<ClinicRouteProp>();
  const { childId } = route.params;
  const [child, setChild] = useState<ChildFull | null>(null);
  const [clinic, setClinic] = useState<ClinicResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [childData, clinicData] = await Promise.all([
          ChildrenService.getFullInfo(childId),
          ClinicService.getClinicByChildId(childId),
        ]);

        setChild(childData);
        setClinic(clinicData);
      } catch (_error) {
        Alert.alert("Ошибка", "Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    if (childId) {
      void loadData();
    }
  }, [childId]);

  const handleViewMap = async () => {
    if (!clinic?.latitude || !clinic?.longitude) {
      Alert.alert("Ошибка", "Координаты поликлиники не найдены");

      return;
    }

    const { latitude, longitude } = clinic;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    try {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Ошибка", "Не удалось открыть карты");
      }
    } catch (_error) {
      Alert.alert("Ошибка", "Не удалось открыть карты");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Информация" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        ) : !clinic || !child ? (
          <Text style={{ fontSize: 16, color: "#6B7280", fontWeight: "600", textAlign: "center", marginTop: 20 }}>
            Поликлиника не найдена для этого ребенка
          </Text>
        ) : (
          <InformationAboutClinicComponent clinic={clinic} childName={child.name} onViewMap={handleViewMap} />
        )}
      </ScrollView>
      <Footer />    
    </View>
  );
}
