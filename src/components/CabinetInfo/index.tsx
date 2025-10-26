import { useEffect, useState } from "react";
import type {NativeSyntheticEvent,NativeTouchEvent} from "react-native";
import { Alert,Image, Modal, Text, TouchableOpacity, View } from "react-native";
import MockImage from "@assets/mockPhotos/Avatar.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

import { styles } from "./styled";
import type { Patient } from "./types";

import { getDaysSinceRegistration } from "@/helpers/dateFormat";
import AuthService from "@/http/auth";
import PersonInfoService from "@/http/patienInfo";
import UserService from "@/http/userService";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

type TouchEvent = NativeSyntheticEvent<NativeTouchEvent>;

const CabinetInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
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

  const handleDotsPress = (event: TouchEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    setTooltipPosition({ x: pageX - 110, y: pageY -15 });
    setShowTooltip(true);
  };

  const handleEdit = () => {
    setShowTooltip(false);
    navigation.navigate(ROUTES.STACK.USER_EDIT_PROFILE);
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  const pickImage = async () => {
    try {

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Ошибка', 'Для выбора фото необходим доступ к галерее');

        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0].base64) {
        await uploadAvatar(result.assets[0].base64);
      }
    } catch (error) {
      console.error('Ошибка при выборе изображения:', error);
      Alert.alert('Ошибка', 'Не удалось выбрать изображение');
    }
  };

  const uploadAvatar = async (base64Data: string) => {
    try {
      setIsLoading(true);

      const dataUrl = `data:image/jpeg;base64,${base64Data}`;

      const updatedPatient = await PersonInfoService.updatePatientAvatar(dataUrl);

      setPatient(updatedPatient);

      Alert.alert('Успешно', 'Аватар обновлен');
    } catch  {

      Alert.alert('Ошибка', 'Не удалось обновить аватар');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarPress = () => {
    Alert.alert(
      'Сменить аватар',
      'Выберите действие',
      [
        {
          text: 'Выбрать из галереи',
          onPress: pickImage,
        },
        {
          text: 'Отмена',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <View style={styles.main}>
          <TouchableOpacity onPress={handleAvatarPress} disabled={isLoading}>
            <Image
              style={[styles.image, isLoading && { opacity: 0.7 }]}
              source={
                patient?.avatar
                  ? { uri: patient.avatar }
                  : MockImage
              }
              alt="Avatar"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.info}>
            <Text style={styles.title}>
              {patient?.firstName} {patient?.lastName}
            </Text>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Зарегистрирован(а):</Text>
              <Text style={styles.registrationBold}> {getDaysSinceRegistration(String(patient?.createdAt))}</Text>
            </View>

            <Text style={styles.location}>{patient?.region ? patient.region : "Город не указан"}</Text>

            <Text style={styles.tel}>{patient?.phoneNumber}</Text>
          </View>

          <TouchableOpacity style={styles.dots} onPress={handleDotsPress}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showTooltip}
        transparent={true}
        animationType="fade"
        onRequestClose={closeTooltip}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeTooltip}
        >
          <View
            style={[
              styles.tooltip,
              {
                position: 'absolute',
                top: tooltipPosition.y,
                left: tooltipPosition.x
              }
            ]}
          >
            <TouchableOpacity style={styles.tooltipItem} onPress={handleEdit}>
              <Text style={styles.tooltipText}>Редактировать</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Text style={styles.citate}>
        {patient?.citate || "Считаю, что залог хорошего здоровья - правильный уход и дисциплина"}
      </Text>
    </View>
  );
};

export default CabinetInfo;
