import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";
 
import IstoriaPriemov from "@/components/IstoriaPriemov";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserIstoriaPriemovScreen() {
  return (
    <View style={styles.container}>
      <Header title={"История приемов"} isAuthenticated={true} />
      <View style={styles.content}>
        <IstoriaPriemov />
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
