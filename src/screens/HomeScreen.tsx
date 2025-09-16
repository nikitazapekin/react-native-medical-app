import React from "react";
import {  View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { styles } from "./styles";

import WelcomeComponent from "@/components/WelcomeComponent";
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
 
  return (
    <View style={styles.container}>
      <WelcomeComponent
        navigation={navigation}
      />

    </View>
  );
}
