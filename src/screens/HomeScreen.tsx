import React from "react";
import { Image,  Text, View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { styles } from "./styles";

import CustomButton from "@/components/shared/Button";
import { LogoImage } from "@/constants/icons";
import { ROUTES } from "@/navigation/routes";

type RootStackParamList = {
  Home: undefined;
  [ROUTES.STACK.AUTH]: undefined;
  [ROUTES.STACK.MAIN]: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const handleContinue = () => {
    navigation.navigate(ROUTES.STACK.AUTH);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.title}>Добро пожаловать</Text>
        <Image source={LogoImage} style={styles.image} resizeMode="contain" />
        <CustomButton
          handler={handleContinue}
          text="Продолжить"
          backgroundColor="#1280b2"
        />
      </View>
    </View>
  );
}
