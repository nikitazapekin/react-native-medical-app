import React from 'react';
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import IstoriaBoleznei from '@/components/IstoriaBoleznei';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function IstoriaBolezneiScreen() {
  return (
    <View style={styles.container}>
      <Header title={"История болезней"} isAuthenticated={true} />
      <View style={styles.content}>
        <IstoriaBoleznei />
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
