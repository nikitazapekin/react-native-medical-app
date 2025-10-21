import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import ChildrenHealthStatusComponent from "@/components/ChildrenHealthStatus";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const ChildrenHealthStatus = () => {
  return (
    <>
      <View style={styles.container}>
        <Header title="Состояние ребенка" isAuthenticated={true} DoctorLogin={false} />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <ChildrenHealthStatusComponent />

        </ScrollView>

        <Footer />

        <StatusBar style="auto" />
      </View>
    </>
  );
};

export default ChildrenHealthStatus;
