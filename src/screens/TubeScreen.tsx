import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import UserCatalogDoctorsComponent from "@/components/UserCatalogDoctorsComponent";

export default function TubeScreen() {
  return (
    <View style={styles.container}>
      <Header isAuthenticated={true} title="Врачи" DoctorLogin={false} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <UserCatalogDoctorsComponent />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
