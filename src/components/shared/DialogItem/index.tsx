
import { useState } from "react";
import { Alert,Image, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import MockImage from "../../../assets/mockPhotos/Avatar.png";

import { styles } from "./styled";
import type { DialogTypes } from "./types";

import ChatService from "@/http/chat";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface UserData {
  email: string | null;
  id: string | null;
  role: string | null;
}

const DialogItem = ({ item }: DialogTypes) => {
  const navigation = useNavigation<FormNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const getStoredUserData = async (): Promise<UserData> => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      const id = await AsyncStorage.getItem("userId");
      const role = await AsyncStorage.getItem("userRole");

      console.log("Stored user data - Email:", email, "ID:", id, "Role:", role);

      return { email, id, role };
    } catch (error) {
      console.error("Error getting data from AsyncStorage:", error);

      return { email: null, id: null, role: null };
    }
  };

  const handleNavigate = async () => {
    try {
      setIsLoading(true);

      const userData = await getStoredUserData();

      if (!userData.id) {
        Alert.alert("Ошибка", "Пользователь не идентифицирован");

        return;
      }

      const currentUserId = Number(userData.id);
      const recipientId = Number(item.id);

      if (!recipientId) {
        Alert.alert("Ошибка", "ID получателя не указан");

        return;
      }

      console.log("Creating chat between:", {
        currentUserId,
        recipientId,
        userRole: userData.role
      });

      const isDoctor = userData.role === 'DOCTOR';
      const patientId = isDoctor ? recipientId : currentUserId;
      const doctorId = isDoctor ? currentUserId : recipientId;

      console.log("Starting chat with:", { patientId, doctorId });

      const chatId = await ChatService.startChat(patientId, doctorId);

      navigation.navigate(ROUTES.STACK.CHAT, {
        id: recipientId,
        chatId: chatId
      });

    } catch (error: any) {
      console.error("Error creating chat:", error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable
      style={[styles.wrapper ]}
      onPress={handleNavigate}
      disabled={isLoading}
    >
      <View style={styles.card}>
        <View style={styles.main}>
          <Image source={MockImage} resizeMode="contain" />
          <View style={styles.content}>
            <Text style={styles.author}>
              {item.id} {item.name}
            </Text>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>

          <Text style={styles.time}>{item.time}</Text>
        </View>

      </View>
    </Pressable>
  );
};

export default DialogItem;
