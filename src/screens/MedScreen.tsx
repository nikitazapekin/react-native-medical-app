import React from 'react';
import {   ScrollView,Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function MedScreen( ) {
  return (
    <View style={styles.container}>

      <Header
        title="Лекарства"
        isAuthenticated={true}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Med</Text>

      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
