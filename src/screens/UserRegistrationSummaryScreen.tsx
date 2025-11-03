import React from "react";
import { ScrollView, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import RegistrationSummaryComponent from "@/components/RegistrationSummaryComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type SummaryRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_REGISTRATION_SUMMARY>;

export default function UserRegistrationSummaryScreen() {
  const route = useRoute<SummaryRouteProp>();
  const navigation = useNavigation();
  const { doctor, selectedDate, selectedTime } = route.params;

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Запись" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <RegistrationSummaryComponent
          doctor={doctor}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onCancel={handleCancel}
        />
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
