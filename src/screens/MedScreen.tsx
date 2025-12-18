import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import MedScreenDrugs from "@/components/MedScreenDrugs";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function MedScreen() {
  return (
    <View style={styles.container}>
      <Header title="Лекарства" isAuthenticated={true} />

      <View style={styles.content}>
        <MedScreenDrugs />
      </View>

      <Footer />

    </View>
  );
}
