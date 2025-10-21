import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import SpisokSovetov from "@/components/SpisokSovetov";

export default function UserSpisokSovetovScreen() {
  return (
    <View style={styles.container}>
      <Header title={"Список советов"} isAuthenticated={true} />
      <View style={styles.content}>
        <SpisokSovetov />
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
