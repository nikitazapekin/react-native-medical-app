import React from "react";
import { ScrollView, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import ChildrenComponent from "@/components/ChildrenComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { RootStackParamList } from "@/navigation/types";

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'Children'>;

}

export default function ChildrenScreen({ route }: UserEditChildrenProps) {
  const { id } = route.params || {};

  return (
    <View style={styles.containerWhite}>
      <Header title={"Ребенок"} isAuthenticated={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <ChildrenComponent id={id} />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
 