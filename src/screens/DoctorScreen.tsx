import React from "react";
import { View} from "react-native";

import { StatusBar } from 'expo-status-bar';

import { styles } from "./styles";

import FooterDoctor from "@/components/shared/FooterDoctor";


//type DoctorScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.STACK.DOCTOR>;



const DoctorScreen = () => {
  return (
    <View style={styles.container}>

      <FooterDoctor></FooterDoctor>
      <StatusBar style="auto" />
    </View>
  );
};

export default DoctorScreen;
