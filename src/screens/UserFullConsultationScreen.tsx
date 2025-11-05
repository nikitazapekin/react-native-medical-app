import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import FullConsultationComponent from "@/components/FullConsultationComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { doctorsCatalog } from "@/constants/doctorsCatalog";
import { historyConsultation } from "@/constants/historyConsultation";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp,RootStackParamList } from "@/navigation/types";

type FullConsultationRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_FULL_CONSULTATION>;

export default function UserFullConsultationScreen() {
  const route = useRoute<FullConsultationRouteProp>();
  const navigation = useNavigation<FormNavigationProp>();
  const { consultationId } = route.params;

  const consultation = useMemo(() => {
    return historyConsultation.find((c) => c.id === consultationId);
  }, [consultationId]);

  const doctor = useMemo(() => {
    if (!consultation) return null;

    return doctorsCatalog.find((d) => d.id === consultation.doctorId);
  }, [consultation]);

  const handleReBook = () => {
    if (doctor) {
      navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor });
    }
  };

  if (!consultation || !doctor) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header title="Консультация" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <FullConsultationComponent consultation={consultation} doctor={doctor} onReBook={handleReBook} />
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
