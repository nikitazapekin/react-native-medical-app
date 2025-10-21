import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import OprosSoveti from "@/components/OprosSoveti";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserOprosScreen() {
  return (
    <View style={styles.container}>
      <Header title={"Опрос"} isAuthenticated={true} />
      <View style={styles.content}>
        <OprosSoveti />
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
