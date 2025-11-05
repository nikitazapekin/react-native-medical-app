import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import CatalogServicesComponent from "@/components/CatalogServicesComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserCatalogServicesScreen() {
  return (
    <View style={styles.container}>
      <Header title="Услуги" isAuthenticated={true} showBackButton={true}/>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <CatalogServicesComponent />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
