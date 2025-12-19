import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import DoctorCabinetInfo from "@/components/DoctorCabinetInfo";
import FooterDoctor from "@/components/shared/FooterDoctor";
import Header from '@/components/shared/Header';
import TodayDoctorRecords from "@/components/shared/Recorditem";
 

const DoctorScreen = () => {
  return (

    <View style={styles.container}>

      <Header title='Профиль' isAuthenticated={true} DoctorLogin={true} />

      <View style={{
        flex: 1, marginTop: 60,
        padding: 16,
      }}>
        <DoctorCabinetInfo />
        <TodayDoctorRecords />
      </View>

      <FooterDoctor />
    </View>
  );
};

export default DoctorScreen;
