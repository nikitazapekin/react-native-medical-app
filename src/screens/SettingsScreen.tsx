import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { COLORS } from "../../appStyles";

import { TEXTS } from "@/navigation/routes";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{TEXTS.HEADER.SETTINGS}</Text>
      </View>
      <View style={styles.content}>
        <Text>{TEXTS.CONTENT.SETTINGS}</Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
