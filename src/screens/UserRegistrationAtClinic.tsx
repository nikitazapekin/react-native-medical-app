import React from "react";
import { ScrollView, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import RegistrationAtClinicComponent from "@/components/RegistrationAtClinicComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { ROUTES } from "@/navigation/routes";
import { ROUTES as APP_ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type UserRegistrationRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_REGISTRATION_AT_CLINIC>;

export default function UserRegistrationAtClinic() {
  const route = useRoute<UserRegistrationRouteProp>();
  const navigation = useNavigation();
  const { doctor } = route.params;

  const handleSelectionChange = ({ date, time }: { date: Date | null; time: string | null }) => {
    navigation.setParams?.({ doctor, selectedDate: date?.toISOString?.() ?? null, selectedTime: time ?? null } as any);
  };

  const handleSubmit = ({ date, time }: { date: Date | null; time: string | null }) => {
    const selectedDateIso = date?.toISOString?.() ?? null;
    const selectedTimeVal = time ?? null;

    (navigation as any).navigate(APP_ROUTES.STACK.USER_REGISTRATION_SUMMARY, {
      doctor,
      selectedDate: selectedDateIso,
      selectedTime: selectedTimeVal,
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Запись" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <RegistrationAtClinicComponent onSelectionChange={handleSelectionChange} onSubmit={handleSubmit} />
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
