import React, { createContext, useRef } from "react";
import { ScrollView, View } from "react-native";

import { styles } from "./styles";

import AppointmentsListComponent from "@/components/AppointmentsListComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export const ScrollViewContext = createContext<React.RefObject<ScrollView | null> | null>(null);

export default function UserAppointmentsScreen() {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <ScrollViewContext.Provider value={scrollViewRef}>
      <View style={styles.container}>
        <Header title="Записи в поликлинику" isAuthenticated={true} showBackButton={true} />

        <ScrollView 
          ref={scrollViewRef}
          style={styles.content} 
          contentContainerStyle={styles.contentContainer} 
          nestedScrollEnabled={true}
        >
          <AppointmentsListComponent />
        </ScrollView>

        <Footer />

      </View>
    </ScrollViewContext.Provider>
  );
}
