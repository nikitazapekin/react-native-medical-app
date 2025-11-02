import React from "react";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { TEXTS } from "@/navigation/routes";
import CatalogComponent from "@/components/CatalogComponent";

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <Header title={TEXTS.HEADER.CATALOG} isAuthenticated={true}/>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <CatalogComponent/>
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
