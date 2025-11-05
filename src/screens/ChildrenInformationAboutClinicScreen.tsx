import React, { useEffect, useMemo, useState } from "react";
import { Alert, Linking, ScrollView, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import InformationAboutClinicComponent from "@/components/InformationAboutClinicComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { clinicList } from "@/constants/clinicList";
import ChildrenService from "@/http/children";
import type { ChildFull } from "@/http/types/childFull";
import type { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type ClinicRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.CHILDREN_INFORMATION_ABOUT_CLINIC>;

export default function ChildrenInformationAboutClinicScreen() {
  const route = useRoute<ClinicRouteProp>();
  const { childId } = route.params;
  const [child, setChild] = useState<ChildFull | null>(null);

  const clinic = useMemo(() => {
    return clinicList.find((c) => c.childId === childId);
  }, [childId]);

  useEffect(() => {
    const loadChild = async () => {
      try {
        const childData = await ChildrenService.getFullInfo(childId);

        setChild(childData);
      } catch (_error) {
        Alert.alert("Ошибка", "Не удалось загрузить данные ребенка");
      }
    };

    if (childId) {
      void loadChild();
    }
  }, [childId]);

  const handleViewMap = async () => {
    if (!clinic?.coordinates) {
      Alert.alert("Ошибка", "Координаты поликлиники не найдены");

      return;
    }

    const { latitude, longitude } = clinic.coordinates;
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

  if (!clinic || !child) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header title="Информация" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <InformationAboutClinicComponent clinic={clinic} childName={child.name} onViewMap={handleViewMap} />
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
