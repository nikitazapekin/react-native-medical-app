import React from "react";
import { ScrollView, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import PaymentsHistory from "@/components/PaymentsHistory";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { RootStackParamList } from "@/navigation/types";

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'Payments'>;

}
export default function PaymentScreen({ route }: UserEditChildrenProps) {
  const { id } = route.params || {};

  return (
    <View style={styles.container}>
      <Header title="История платежей" isAuthenticated={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <PaymentsHistory id={String(id)} />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}

/*

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'UserPriemiHistory'>;

}
export default function UserIstoriaPriemovScreen({ route }: UserEditChildrenProps) {
  const { id } = route.params || {};

  console.log(id);
  */
