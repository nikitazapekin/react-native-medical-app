import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import Recommendations from "@/components/Recommendations";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserRecommendations() {
  return (
    <View style={styles.container}>
      <Header title={"Рекомендации"} isAuthenticated={true} showBackButton={true}/>
      <View style={styles.content}>
        <Recommendations />
      </View>
      <Footer />    
    </View>
  );
}
