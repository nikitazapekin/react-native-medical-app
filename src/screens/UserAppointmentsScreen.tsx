import React from "react";
import { ScrollView, View } from "react-native";

import { styles } from "./styles";

import AppointmentsListComponent from "@/components/AppointmentsListComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function UserAppointmentsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Записи в поликлинику" isAuthenticated={true} showBackButton={true} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} nestedScrollEnabled={true}>
        <AppointmentsListComponent />
      </ScrollView>

      <Footer />

    </View>
  );
}
