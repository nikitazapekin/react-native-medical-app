import React from 'react';
import { StyleSheet, Text, View } from "react-native";
 
import type { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from "expo-status-bar";

import { COLORS } from '../../appStyles';

import CustomButton from "@/components/shared/Button";
import type { ROUTES} from '@/navigation/routes';
import { TEXTS } from '@/navigation/routes';

type TabParamList = {
  [ROUTES.TABS.HOME]: undefined;
  [ROUTES.TABS.PROFILE]: undefined;
  [ROUTES.TABS.SETTINGS]: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<TabParamList, typeof ROUTES.TABS.PROFILE>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{TEXTS.HEADER.PROFILE}</Text>
      </View>
      <View style={styles.content}>
        <Text>{TEXTS.CONTENT.PROFILE}</Text>
        <CustomButton
          text={TEXTS.BUTTONS.EDIT_PROFILE}
          handler={() => {}}
          backgroundColor="green"
        />
        <CustomButton
          text={TEXTS.BUTTONS.BACK}
          handler={() => navigation.goBack()}
          backgroundColor="gray"
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
