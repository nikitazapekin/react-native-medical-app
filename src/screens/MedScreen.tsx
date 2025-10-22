import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import MedScreenDrugs from "@/components/MedScreenDrugs";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function MedScreen() {
  return (
    <View style={styles.container}>
      <Header title="Лекарства" isAuthenticated={true} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <MedScreenDrugs />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
