import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Chats from "@/components/Chats/ChatDoctors";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <Header title={"Чаты"} isAuthenticated={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Chats />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
