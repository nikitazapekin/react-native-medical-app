import React from "react";
import { View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import IstoriaPriemov from "@/components/IstoriaPriemov";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { RootStackParamList } from "@/navigation/types";

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'UserPriemiHistory'>;

}
export default function UserIstoriaPriemovScreen({ route }: UserEditChildrenProps) {
  const { id } = route.params || {};

  console.log(id);

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
