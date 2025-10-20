import { Pressable,Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface HeaderProps {
  title: string;
  isAuthenticated?: boolean
  DoctorLogin?: boolean
}

const Header = ({ title, isAuthenticated,DoctorLogin }: HeaderProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    if (DoctorLogin) {
      navigation.navigate(ROUTES.STACK.DOCTOR_CABINET);
    } else {
      navigation.navigate(ROUTES.STACK.CABINET);
    }
  };

  return (
    <View style={styles.header}>
      {isAuthenticated && (
        <Pressable
          style={styles.circle}
          onPress={handleNavigate}
        />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;
