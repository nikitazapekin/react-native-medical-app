import React from "react";
import {  ScrollView, View} from "react-native";
import { StatusBar } from 'expo-status-bar';

import { styles } from "./styles";

import FooterDoctor from "@/components/shared/FooterDoctor";
import Header from '@/components/shared/Header';
import DoctorCabinetInfo from "@/components/DoctorCabinetInfo";
import TodayAppointments from "@/components/shared/Recorditem";
import TodayDoctorRecords from "@/components/shared/Recorditem";

//type DoctorScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.STACK.DOCTOR>;

const DoctorScreen = () => {
  return (
    
    <View style={styles.container}>

      <Header title='Профиль' isAuthenticated={true} DoctorLogin={true}/>
      
  
  
  
  <View style={{ flex: 1,marginTop: 60,
    padding: 16, }}>
  <DoctorCabinetInfo />
  <TodayDoctorRecords /> 
</View>



<FooterDoctor />


      <StatusBar style="auto" />
    </View>
  );
};

export default DoctorScreen;
