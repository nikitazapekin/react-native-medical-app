import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import ConsultationHistoryComponent from "@/components/ConsultationHistoryComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserConsultationHistory() {
  return (
    <View style={styles.container}>
      <Header title="История консультаций" isAuthenticated={true} showBackButton={true} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <ConsultationHistoryComponent />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
