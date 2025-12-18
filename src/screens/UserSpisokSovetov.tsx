import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import SpisokSovetov from "@/components/SpisokSovetov";

export default function UserSpisokSovetovScreen() {
  return (
    <View style={styles.container}>
      <Header title={"Список советов"} isAuthenticated={true} showBackButton={true} />
      <View style={styles.content}>
        <SpisokSovetov />
      </View>
      <Footer />
    </View>
  );
}
