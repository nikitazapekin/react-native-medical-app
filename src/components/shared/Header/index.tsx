import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ArrowBack from "@assets/mockPhotos/ArrowBack.png";

import { styles } from "./styled";

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
        <Pressable style={styles.circle} onPress={handleNavigate} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;
