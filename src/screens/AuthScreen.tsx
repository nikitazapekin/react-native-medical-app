import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import AuthForm from "@/components/AuthForm";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AuthForm />
    </View>
  );
}
