import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import FooterDoctor from "@/components/shared/FooterDoctor";

const DOCTOR_CHAT = () => {
  return (
    <View style={styles.container}>

      <FooterDoctor></FooterDoctor>
      <StatusBar style="auto" />
    </View>
  );
};

export default DOCTOR_CHAT;
