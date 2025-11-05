import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import CatalogRecomendationComponent from "@/components/CatalogRecomendationComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserCatalogRecomendatonsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Рекомендации" isAuthenticated={true} showBackButton={true}/>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <CatalogRecomendationComponent />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}


