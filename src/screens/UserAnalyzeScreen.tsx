import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";
 
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import IstoriaAnalyze from "@/components/IstoriaAnalyzov";

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
