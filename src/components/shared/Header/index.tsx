// components/Header/Header.tsx
import { useCallback,useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View} from "react-native";
import ArrowBack from "@assets/mockPhotos/ArrowBack.png";
import MockImage from "@assets/mockPhotos/Avatar.png";
import DoctorDefaultImage from "@assets/mockPhotos/doctorDefault.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect,useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import { useAvatar } from "@/hooks/useAvatar";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface HeaderProps {
  title: string;
  isAuthenticated?: boolean;
  DoctorLogin?: boolean;
  showBackButton?: boolean;
  onAvatarPress?: () => void;
}

const Header = ({
  title,
  isAuthenticated,
  DoctorLogin,
  showBackButton,
  onAvatarPress
}: HeaderProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const {
    avatarUrl,
    userRole,
    isLoading,
    error,
    refetchAvatar,
    clearAvatar
  } = useAvatar();

  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && !showBackButton) {
        loadLocalAvatar().catch(()=>Alert.alert("err"));
      }
    }, [isAuthenticated, showBackButton])
  );

  useEffect(() => {
    if (error && isAuthenticated) {
      console.error("Avatar error:", error);

    }
  }, [error, isAuthenticated]);

  const loadLocalAvatar = async () => {
    try {
      const storedAvatar = await AsyncStorage.getItem('userAvatar');

      if (storedAvatar) {
        setLocalAvatar(storedAvatar);
      }
    } catch (err) {
      console.error("Error loading local avatar:", err);
    }
  };
  const handleRefreshAvatar = async () => {
    try {
      await refetchAvatar();
      await loadLocalAvatar();
    } catch (err) {
      console.error("Error refreshing avatar:", err);
    }
  };

  const handleNavigate = () => {
    if (onAvatarPress) {
      onAvatarPress();

      return;
    }

    if (DoctorLogin) {
      navigation.navigate(ROUTES.STACK.DOCTOR_CABINET);
    } else {
      navigation.navigate(ROUTES.STACK.CABINET);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Долгое нажатие на аватар для отладки
  const handleLongPress = () => {
    Alert.alert(
      "Отладка аватара",
      `URL: ${avatarUrl || "нет"}\nРоль: ${userRole || "не определена"}\nСтатус: ${isLoading ? "загрузка" : "готово"}`,
      [
        {
          text: "Обновить",
          onPress: handleRefreshAvatar
        },
        {
          text: "Очистить кэш",
          onPress: async () => {
            await clearAvatar();
            setLocalAvatar(null);
          }
        },
        {
          text: "Отмена",
          style: "cancel"
        }
      ]
    );
  };

  // Получение источника для изображения
  const getAvatarSource = () => {
    // Используем локальный аватар если есть
    const effectiveAvatar = localAvatar || avatarUrl;

    // Если есть реальный аватар (не дефолтный и не пустой)
    if (effectiveAvatar &&
        !effectiveAvatar.includes('doctorDefault.png') &&
        !effectiveAvatar.includes('mockPhotos/') &&
        effectiveAvatar !== 'null' &&
        effectiveAvatar.trim() !== '') {

      // Проверяем формат URL
      if (effectiveAvatar.startsWith('data:') ||
          effectiveAvatar.startsWith('http://') ||
          effectiveAvatar.startsWith('https://')) {
        return { uri: effectiveAvatar };
      }

      // Если это относительный путь
      if (effectiveAvatar.startsWith('/')) {
        return { uri: `http://192.168.1.14:7082${effectiveAvatar}` };
      }
    }

    // Возвращаем дефолтное изображение в зависимости от роли
    if (userRole === "DOCTOR") {
      return DoctorDefaultImage;
    }

    return MockImage;
  };

  const avatarSource = getAvatarSource();

  return (
    <View style={styles.header}>
      {/* Кнопка "Назад" */}
      {showBackButton && (
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image
            source={ArrowBack}
            style={styles.backButtonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      {/* Аватар пользователя (только для авторизованных) */}
      {isAuthenticated && !showBackButton && (
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleNavigate}
          onLongPress={handleLongPress}
          delayLongPress={1000}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={[styles.avatar ]}>
              <ActivityIndicator size="small" color="#4A90E2" />
            </View>
          ) : (
            <>
              <Image
                source={avatarSource}
                style={[
                  styles.avatar,

                ]}
                resizeMode="cover"

                onError={(e) => {
                  console.log("Error loading avatar image:", e.nativeEvent.error);
                  // При ошибке загрузки показываем дефолтное изображение
                }}
              />

            </>
          )}
        </TouchableOpacity>
      )}

      <Text
        style={[
          styles.headerTitle,

        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>

    </View>
  );
};

export default Header;
