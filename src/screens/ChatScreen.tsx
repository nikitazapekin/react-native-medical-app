import React, { useEffect, useState } from "react";
import { Alert,ScrollView,  View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {   type RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

//import Avatar from "../assets/mockPhotos/Avatar.png";
import { styles } from "./styles";

import Chat from "@/components/Chat";
import Header from "@/components/shared/Header";
import AuthService from "@/http/auth";
import type {   RootStackParamList } from "@/navigation/types";

interface UserData {
  email: string | null;
  id: string | null;
}

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'Chat'>;
}

export default function ChatScreen({ route }: UserEditChildrenProps) {
  const { id } = route.params || {};
  const [userData, setUserData] = useState<UserData | null>(null);

  console.log("id chat", id);

  useEffect(() => {
    const loadUserData = async () => {
      try {

        const currentUser = await AuthService.getCurrentUser();

        console.log("USERRR", currentUser);

        if (currentUser) {
          setUserData({
            email: currentUser.email,
            id: await AsyncStorage.getItem('userId')
          });
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData().catch(()=>Alert.alert("Err"));
  }, []);

  console.log("Current user ID:", userData?.id);
  console.log("Current user email:", userData?.email);

  return (
    <View style={styles.container}>
      <Header title="Чат" isAuthenticated={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Chat messages={[]} />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
