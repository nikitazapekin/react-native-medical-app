import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import RegistrationAtClinicComponent from "@/components/RegistrationAtClinicComponent";
import { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";
import { styles } from "./styles";

type UserRegistrationRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_REGISTRATION_AT_CLINIC>;

export default function UserRegistrationAtClinic() {
  const route = useRoute<UserRegistrationRouteProp>();
  const navigation = useNavigation();
  const { doctor } = route.params;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSelectionChange = ({ date, time }: { date: Date | null; time: string | null }) => {
    setSelectedDate(date);
    setSelectedTime(time);
    navigation.setParams?.({ doctor, selectedDate: date?.toISOString?.() ?? null, selectedTime: time ?? null } as any);
    console.log("Selected date:", selectedDate);
    console.log("Selected time:", selectedTime);
  };

  return (
    <View style={styles.container}>
      <Header title="Запись" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <RegistrationAtClinicComponent doctor={doctor} onSelectionChange={handleSelectionChange} />
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
