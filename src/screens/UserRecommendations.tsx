import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Recommendations from "@/components/Recommendations";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserRecommendations() {
  return (
    <View style={styles.container}>
      <Header title={"Рекомендации"} isAuthenticated={true} />
      <View style={styles.content}>
        <Recommendations />
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
