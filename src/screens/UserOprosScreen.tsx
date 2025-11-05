import React from "react";
import { View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import OprosSoveti from "@/components/OprosSoveti";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { RootStackParamList } from "@/navigation/types";

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'UserOpros'>;

}

export default function UserOprosScreen({ route }: UserEditChildrenProps) {
  const { id } = route.params || {};

  console.log(id);

  return (
    <View style={styles.container}>
      <Header title={"Опрос"} isAuthenticated={true} />
      <View style={styles.content}>
        <OprosSoveti id={String(id)} />
      </View>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}

// USER_OPROS: "UserOpros",
