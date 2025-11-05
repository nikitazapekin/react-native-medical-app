import React from "react";
import { View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import IstoriaAnalyze from "@/components/IstoriaAnalyzov";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { RootStackParamList } from "@/navigation/types";

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'UserAnalyzeHistory'>;

}

export default function UserAnalyzeScreen({ route }: UserEditChildrenProps) {
  const { id } = route.params || {};

  return (
    <View style={styles.container}>
      <Header title={"История анализов"} isAuthenticated={true} />
      <View style={styles.content}>
        <IstoriaAnalyze  id={String(id)}/>
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
