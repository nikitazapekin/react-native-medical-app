import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import MedicalCardComponent from "@/components/MedicalCardComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function MedicalCardScreen() {
  return (
    <View style={styles.container}>
      <Header title="Лекарства" isAuthenticated={true} DoctorLogin={false} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <MedicalCardComponent />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
