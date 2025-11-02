import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import UserCatalogDoctorsComponent from "@/components/UserCatalogDoctorsComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserCatalogDoctorsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Популярные врачи" isAuthenticated={true} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <UserCatalogDoctorsComponent />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
