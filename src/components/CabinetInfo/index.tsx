// components/CabinetInfo/CabinetInfo.tsx
import { useState } from "react";
import type { NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View} from "react-native";
import MockImage from "@assets/mockPhotos/Avatar.png";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { styles } from "./styled";
import type { CabinetInfoProps } from "./types";

import { getDaysSinceRegistration } from "@/helpers/dateFormat";
import { useAvatar } from "@/hooks/useAvatar";
import PersonInfoService from "@/http/patienInfo";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

type TouchEvent = NativeSyntheticEvent<NativeTouchEvent>;

const CabinetInfo = ({ setPatient, patient }: CabinetInfoProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isUploading, setIsUploading] = useState(false);

  const { updateAvatar, refetchAvatar } = useAvatar();
  const navigation = useNavigation<FormNavigationProp>();

  const handleDotsPress = (event: TouchEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    setTooltipPosition({ x: pageX - 110, y: pageY - 15 });
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
      // Запрашиваем разрешения
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Доступ запрещен",
          "Для выбора фото необходимо предоставить доступ к галерее",
          [

            { text: "Отмена", style: "cancel" }
          ]
        );

        return;
      }

      // Открываем галерею
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0].base64) {
        await uploadAvatar(result.assets[0].base64);
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения:", error);
      Alert.alert("Ошибка", "Не удалось выбрать изображение");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Доступ запрещен",
          "Для съемки фото необходимо предоставить доступ к камере",
          [

            { text: "Отмена", style: "cancel" }
          ]
        );

        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0].base64) {
        await uploadAvatar(result.assets[0].base64);
      }
    } catch (error) {
      console.error("Ошибка при съемке фото:", error);
      Alert.alert("Ошибка", "Не удалось сделать фото");
    }
  };

  const uploadAvatar = async (base64Data: string) => {
    try {
      setIsUploading(true);

      // Формируем data URL
      const dataUrl = `data:image/jpeg;base64,${base64Data}`;

      // Обновляем аватар на сервере через PersonInfoService
      const updatedPatient = await PersonInfoService.updatePatientAvatar(dataUrl);

      // Обновляем состояние пациента в родительском компоненте
      setPatient(updatedPatient);

      // Обновляем аватар через хук (сохраняет в кэш и обновляет все компоненты)
      await updateAvatar(dataUrl);

      // Принудительно обновляем данные с сервера
      await refetchAvatar();

      Alert.alert("Успешно", "Аватар обновлен");
    } catch (error: any) {
      console.error("Ошибка при обновлении аватара:", error);

      let errorMessage = "Не удалось обновить аватар";

      if (error.response?.status === 413) {
        errorMessage = "Файл слишком большой. Выберите изображение меньшего размера";
      } else if (error.response?.status === 415) {
        errorMessage = "Неподдерживаемый формат изображения";
      }

      Alert.alert("Ошибка", errorMessage);
    } finally {
      setIsUploading(false);
      setShowTooltip(false);
    }
  };

  const handleAvatarPress = () => {
    Alert.alert(
      "Сменить аватар",
      "Выберите источник изображения",
      [
        {
          text: "Сделать фото",
          onPress: takePhoto,
        },
        {
          text: "Выбрать из галереи",
          onPress: pickImage,
        },
        {
          text: "Отмена",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleImageError = () => {
    console.log("Ошибка загрузки изображения аватара");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={handleAvatarPress}
            disabled={isUploading}

          >
            {isUploading ? (
              <View style={[styles.image,  ]}>
                <ActivityIndicator size="large" color="#4A90E2" />
              </View>
            ) : (
              <Image
                style={styles.image}
                source={
                  patient?.avatar && !patient.avatar.includes('doctorDefault.png')
                    ? { uri: patient.avatar }
                    : MockImage
                }
                alt={`Аватар ${patient?.firstName} ${patient?.lastName}`}
                resizeMode="cover"
                onError={handleImageError}
              />
            )}
            {isUploading && (
              <View  >
                <ActivityIndicator color="#FFFFFF" />
                <Text  >Загрузка...</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.info}>
            <Text style={styles.title}>
              {patient?.firstName} {patient?.lastName}
            </Text>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Зарегистрирован(а):</Text>
              <Text style={styles.registrationBold}>
                {" "}
                {getDaysSinceRegistration(String(patient?.createdAt))}
              </Text>
            </View>

            <Text style={styles.location}>
              {patient?.region ? patient.region : "Город не указан"}
            </Text>

            <Text style={styles.tel}>{patient?.phoneNumber}</Text>
          </View>

          <TouchableOpacity
            style={styles.dots}
            onPress={handleDotsPress}
            disabled={isUploading}
          >
            <View style={[styles.dot ]} />
            <View style={[styles.dot, ]} />
            <View style={[styles.dot ]} />
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
                position: "absolute",
                top: tooltipPosition.y,
                left: tooltipPosition.x,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.tooltipItem}
              onPress={handleEdit}
              disabled={isUploading}
            >
              <Text style={[styles.tooltipText, ]}>
                Редактировать профиль
              </Text>
            </TouchableOpacity>
            <View  />
            <TouchableOpacity
              style={styles.tooltipItem}
              onPress={handleAvatarPress}
              disabled={isUploading}
            >
              <Text style={[styles.tooltipText ]}>
                Сменить аватар
              </Text>
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
