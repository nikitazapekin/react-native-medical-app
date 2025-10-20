import React from "react";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function TubeScreen() {
  return (
    <View style={styles.container}>
      <Header isAuthenticated={true} title="Test" DoctorLogin={false} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Tube</Text>
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
