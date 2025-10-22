import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import RegisterForm from "@/components/RegisterForm";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
}
