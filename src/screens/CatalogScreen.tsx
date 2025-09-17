import React from 'react';
import {   ScrollView,Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function CatalogScreen( ) {
  return (
    <View style={styles.container}>

      <Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Catalog</Text>

      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
