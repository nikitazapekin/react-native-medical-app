import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import TodayDoctorRecords from "@/components/DoctorRecords";
import FooterDoctor from "@/components/shared/FooterDoctor";
import Header from "@/components/shared/Header";

const DoctorAppointmentsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Записи" isAuthenticated={true} DoctorLogin={true}></Header>

      <View style={{
        flex: 1, marginTop: 60,
        padding: 16,
      }}>
        < TodayDoctorRecords/>
      </View>
      <FooterDoctor></FooterDoctor>
      <StatusBar style="auto" />
    </View>
  );
};

export default DoctorAppointmentsScreen;
