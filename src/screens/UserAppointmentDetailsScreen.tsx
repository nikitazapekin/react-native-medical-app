import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styles";

import AppointmentDetailsComponent from "@/components/AppointmentDetailsComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import MedicalAppointmentService from "@/http/medicalAppointment";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp,RootStackParamList } from "@/navigation/types";

type AppointmentDetailsRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_APPOINTMENT_DETAILS>;

export default function UserAppointmentDetailsScreen() {
  const route = useRoute<AppointmentDetailsRouteProp>();
  const navigation = useNavigation<FormNavigationProp>();
  const { appointmentId } = route.params;

  const [consultation, setConsultation] = useState<MedicalAppointmentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConsultation = async () => {
    try {
      setLoading(true);
      const data = await MedicalAppointmentService.getAppointmentById(Number(appointmentId));

      setConsultation(data);
    } catch (error) {
      console.error("Error fetching appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchConsultation();
  }, [appointmentId]);

  const handleReBook = () => {
    if (consultation?.doctor) {
      navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor: consultation.doctor });
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Отменить запись",
      "Вы уверены, что хотите отменить эту запись?",
      [
        { text: "Нет", style: "cancel" },
        {
          text: "Да, отменить",
          style: "destructive",
          onPress: async () => {
            try {
              await MedicalAppointmentService.cancelAppointment(Number(appointmentId));
              Alert.alert("Успешно", "Запись отменена");
              await fetchConsultation();
            } catch {
              Alert.alert("Ошибка", "Не удалось отменить запись");
            }
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    if (consultation?.doctor) {
      navigation.navigate(ROUTES.STACK.USER_REGISTRATION_AT_CLINIC, {
        doctor: consultation.doctor,
        appointmentId: Number(appointmentId),
        serviceName: consultation.service?.title,
        serviceId: consultation.service?.id,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Запись в поликлинику" isAuthenticated={true} showBackButton={true} />
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
        <Header title="Запись в поликлинику" isAuthenticated={true} showBackButton={true} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Запись не найдена</Text>
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Запись в поликлинику" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <AppointmentDetailsComponent
          consultation={consultation}
          onReBook={handleReBook}
          onCancel={handleCancel}
          onReschedule={handleReschedule}
        />
      </ScrollView>
      <Footer />
    </View>
  );
}
