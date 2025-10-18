import React  from "react";
import {
  ScrollView,
  Text,
  View} from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import DoctorSwiper from "@/components/DoctorSwiper";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import SwiperWithDots from "@/components/SwiperWithDots";
import { TEXTS } from "@/navigation/routes";

export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <Header title={TEXTS.HEADER.HOME}
        isAuthenticated={true}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Личная информация</Text>

        <SwiperWithDots />
        <DoctorSwiper />
      </ScrollView>

      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
