import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RouteProp, useRoute } from "@react-navigation/native";

import { styles } from "./styles";

import AboutDoctorComponent from "@/components/AboutDoctorComponent";
import Footer from "@/components/shared/Footer";
import type { RootStackParamList } from "@/navigation/types";
import { ROUTES } from "@/navigation/routes";
import Header from "@/components/shared/Header";

type UserAboutDoctorRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_ABOUT_DOCTOR>;

export default function UserAboutDoctorScreen() {
  const route = useRoute<UserAboutDoctorRouteProp>();
  const { doctor } = route.params;

  return (
    <View style={styles.container}>
      <Header title="О враче" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <AboutDoctorComponent doctor={doctor} />
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
