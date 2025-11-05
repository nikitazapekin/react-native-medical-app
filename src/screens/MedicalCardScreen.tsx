import React from "react";
import { ScrollView, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import MedicalCardComponent from "@/components/MedicalCardComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { RootStackParamList } from "@/navigation/types";

// MEDICALCARD: "MedicalCard",
interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'MedicalCard'>;

}
export default function MedicalCardScreen({ route }: UserEditChildrenProps) {
  const { id } = route.params || {};

  return (
    <View style={styles.container}>
      <Header title="Медицинская карта" isAuthenticated={true} DoctorLogin={false} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <MedicalCardComponent id={String(id)} />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
