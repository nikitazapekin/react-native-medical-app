import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import CabinetInfo from "@/components/CabinetInfo";
import CabinetOptions from "@/components/CabinetOptions";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const CabinetScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Header title="Профиль" isAuthenticated={true} />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <CabinetInfo />
          <CabinetOptions />
        </ScrollView>

        <Footer />

        <StatusBar style="auto" />
      </View>
    </>
  );
};

export default CabinetScreen;
