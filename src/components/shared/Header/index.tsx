import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ArrowBack from "@assets/mockPhotos/ArrowBack.png";
import MockImage from "@assets/mockPhotos/Avatar.png";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import UserService from "@/http/userService";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface HeaderProps {
  title: string;
  isAuthenticated?: boolean;
  DoctorLogin?: boolean;
  showBackButton?: boolean;
}

const Header = ({ title, isAuthenticated, DoctorLogin, showBackButton }: HeaderProps) => {
  const navigation = useNavigation<FormNavigationProp>();
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const loadUserAvatar = async () => {
      try {
        const userData = await UserService.getCurrentUser();
        setUserAvatar(userData.avatar || null);
      } catch (error) {
        console.log("Failed to load user avatar:", error);
        setUserAvatar(null);
      }
    };

    if (isAuthenticated && !showBackButton) {
      loadUserAvatar().catch(() => console.log("Avatar load error"));
    }
  }, [isAuthenticated, showBackButton]);

  const handleNavigate = () => {
    if (DoctorLogin) {
      navigation.navigate(ROUTES.STACK.DOCTOR_CABINET);
    } else {
      navigation.navigate(ROUTES.STACK.CABINET);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Image source={ArrowBack} style={styles.backButtonIcon} resizeMode="contain" />
        </TouchableOpacity>
      )}
      {isAuthenticated && !showBackButton && (
        <TouchableOpacity style={styles.avatarContainer} onPress={handleNavigate}>
          <Image
            source={userAvatar ? { uri: userAvatar } : MockImage}
            style={styles.avatar}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;
