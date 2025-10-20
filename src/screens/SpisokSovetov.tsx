import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function SpisokSovetov() {
  return (
    <View style={styles.container}>
      <Header title="Список советов" isAuthenticated={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>

      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
