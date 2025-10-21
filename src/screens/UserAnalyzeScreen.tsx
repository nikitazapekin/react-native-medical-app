import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import IstoriaAnalyze from "@/components/IstoriaAnalyzov";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserAnalyzeScreen() {
  return (
    <View style={styles.container}>
      <Header title={"История анализов"} isAuthenticated={true} />
      <View style={styles.content}>
        <IstoriaAnalyze />
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
