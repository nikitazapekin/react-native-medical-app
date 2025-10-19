import React from 'react';
import {   ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import PaymentsHistory from '@/components/PaymentsHistory';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function PaymentScreen( ) {
  return (
    <View style={styles.container}>

      <Header
        title="История платежей"
        isAuthenticated={true}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <PaymentsHistory />

      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
