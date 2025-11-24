import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "appStyles";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import FullConsultationComponent from "@/components/FullConsultationComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import MedicalAppointmentService from "@/http/medicalAppointment";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp,RootStackParamList } from "@/navigation/types";

type FullConsultationRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_FULL_CONSULTATION>;

export default function UserFullConsultationScreen() {
  const route = useRoute<FullConsultationRouteProp>();
  const navigation = useNavigation<FormNavigationProp>();
  const { consultationId } = route.params;

  const [consultation, setConsultation] = useState<MedicalAppointmentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        setLoading(true);
        const data = await MedicalAppointmentService.getAppointmentById(Number(consultationId));

        setConsultation(data);
      } catch (error) {
        console.error("Error fetching consultation:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchConsultation();
  }, [consultationId]);

  const handleReBook = () => {
    if (consultation?.doctor) {
      navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor: consultation.doctor });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Консультация" isAuthenticated={true} showBackButton={true} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
        <Footer />
      </View>
    );
  }

  if (!consultation) {
    return (
      <View style={styles.container}>
        <Header title="Консультация" isAuthenticated={true} showBackButton={true} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Консультация не найдена</Text>
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Консультация" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <FullConsultationComponent consultation={consultation} onReBook={handleReBook} />
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
