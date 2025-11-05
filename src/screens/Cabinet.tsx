import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import CabinetInfo from "@/components/CabinetInfo";
import type { Patient } from "@/components/CabinetInfo/types";
import CabinetOptions from "@/components/CabinetOptions";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import AuthService from "@/http/auth";
import UserService from "@/http/userService";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const CabinetScreen = () => {
  const [patient, setPatient] = useState<Patient>();

  const navigation = useNavigation<FormNavigationProp>();

  useEffect(() => {
    async function checkAuthAndGetUser() {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
          navigation.navigate(ROUTES.STACK.AUTH);

          return;
        }

        const t = await AuthService.validateToken();

        if (t.accessToken !== "Token is valid") {
          navigation.navigate(ROUTES.STACK.AUTH);

          return;
        }

        const userData = await UserService.getCurrentUser();

        setPatient(userData);

        await AsyncStorage.setItem('id', String(userData.id));

      } catch {
        navigation.navigate(ROUTES.STACK.AUTH);
      }
    }

    checkAuthAndGetUser().catch(()=> {
      navigation.navigate(ROUTES.STACK.AUTH);
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <Header title="Профиль" isAuthenticated={true} />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <CabinetInfo patient={patient} setPatient={setPatient }/>
          <CabinetOptions id={patient?.id} />
        </ScrollView>

        <Footer />

        <StatusBar style="auto" />
      </View>
    </>
  );
};

export default CabinetScreen;
