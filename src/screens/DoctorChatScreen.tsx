import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import ChatsDoctor from "@/components/Chats/ChatPatients";
import FooterDoctor from "@/components/shared/FooterDoctor";
import Header from "@/components/shared/Header";

const DOCTOR_CHAT = () => {
  return (
    <View style={styles.container}>
      <Header title="Чаты" isAuthenticated={true} DoctorLogin={true}></Header>

      <View style={[styles.content, styles.contentContainer]}>
        <ChatsDoctor />
      </View>

      <FooterDoctor></FooterDoctor>
    </View>
  );
};

export default DOCTOR_CHAT;
