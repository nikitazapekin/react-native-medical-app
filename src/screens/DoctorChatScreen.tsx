import React from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";


import ChatsDoctor from "@/components/Chats/ChatPatients";
import FooterDoctor from "@/components/shared/FooterDoctor";
import Header from "@/components/shared/Header";

const DOCTOR_CHAT = () => {
  return (
    <View style={styles.container}>

      <Header
        title="Чаты"
        isAuthenticated={true} >

      </Header>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <ChatsDoctor />
      </ScrollView>

      <FooterDoctor></FooterDoctor>
      <StatusBar style="auto" />
    </View>
  );
};

export default DOCTOR_CHAT;
