import React from 'react';
import { StyleSheet, Text, View } from "react-native";
 
import type { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from "expo-status-bar";

import { COLORS } from '../../appStyles';

import CustomButton from "@/components/shared/Button";
import { ROUTES, TEXTS } from '@/navigation/routes';

type TabParamList = {
  [ROUTES.TABS.HOME]: undefined;
  [ROUTES.TABS.PROFILE]: undefined;
  [ROUTES.TABS.SETTINGS]: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<TabParamList, typeof ROUTES.TABS.HOME>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{TEXTS.HEADER.HOME}</Text>
      </View>
      <View style={styles.content}>
        <Text>{TEXTS.CONTENT.HOME}</Text>
        <CustomButton
          text={TEXTS.BUTTONS.GO_TO_PROFILE}
          handler={() => navigation.navigate(ROUTES.TABS.PROFILE)}
          backgroundColor="blue"
        />
        <CustomButton
          text={TEXTS.BUTTONS.GO_TO_SETTINGS}
          handler={() => navigation.navigate(ROUTES.TABS.SETTINGS)}
          backgroundColor="green"
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
