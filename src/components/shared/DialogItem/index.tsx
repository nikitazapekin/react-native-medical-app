import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import MockImage from "../../../assets/mockPhotos/Avatar.png";

import { styles } from "./styled";
import type { DialogItemType } from "./types";

import ChatService from "@/http/chat";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface UserData {
  email: string | null;
  id: string | null;
  role: string | null;
}

const DialogItem = ({ item }: DialogItemType) => {
  const navigation = useNavigation<FormNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getStoredUserData = async (): Promise<UserData> => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      const id = await AsyncStorage.getItem("userId");
      const role = await AsyncStorage.getItem("userRole");

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

      const isDoctor = userData.role === 'DOCTOR';
      const patientId = isDoctor ? recipientId : currentUserId;
      const doctorId = isDoctor ?     currentUserId :  recipientId ;

      console.log("Res", recipientId)
       console.log("current", currentUserId)
      const chatId = await ChatService.startChat(patientId, doctorId, currentUserId, isDoctor);

      navigation.navigate(ROUTES.STACK.CHAT, {
        id: recipientId,
        chatId: chatId
      });

    } catch (error: any) {

      Alert.alert("Ошибка", "Не удалось создать чат: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = ( ) => {

    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(" Image loaded successfully");
  };
  const getImageSource = () => {
    if (imageError) {

      return MockImage;
    }

    if (typeof item.avatar === 'string') {

      if (item.avatar.startsWith('data:image')) {

        let cleanBase64 = item.avatar;

        if (cleanBase64.includes('base64,')) {
          const parts = cleanBase64.split('base64,');

          if (parts.length > 1) {

            const base64Data = parts[1];

            cleanBase64 = `data:image/jpeg;base64,${base64Data}`;
          }
        }

        return { uri: cleanBase64 };
      }

      return { uri: item.avatar };
    }

    if (typeof item.avatar === 'object' && item.avatar !== null && 'uri' in item.avatar) {
      console.log("📁 Using uri object");

      if (typeof item.avatar.uri === 'string' && item.avatar.uri.startsWith('data:image')) {
        let cleanBase64 = item.avatar.uri;

        if (cleanBase64.includes('base64,')) {
          const parts = cleanBase64.split('base64,');

          if (parts.length > 1) {
            const base64Data = parts[1];

            cleanBase64 = `data:image/jpeg;base64,${base64Data}`;
          }
        }

        return { uri: cleanBase64 };
      }

      return item.avatar;
    }

    if (typeof item.avatar === 'number') {

      return item.avatar;
    }

    return MockImage;
  };
  const imageSource = getImageSource();

  console.log("im ", imageSource);

  return (
    <Pressable style={styles.wrapper} onPress={handleNavigate} disabled={isLoading}>
      <View style={styles.card}>
        <View style={styles.main}>

          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
            onError={handleImageError}
            onLoad={handleImageLoad}

          />

          <View style={styles.content}>
            <Text style={styles.author}>{item.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.text} numberOfLines={2}>{item.text}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default DialogItem;
 