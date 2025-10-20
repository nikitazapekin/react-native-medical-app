import React from 'react';
import {  View } from "react-native";
import {   ScrollView,  } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import DoctorCabinetInfo from '@/components/DoctorCabinetInfo';
import DoctorCabinetOptions from '@/components/DoctorCabinetOptions';
import FooterDoctor from '@/components/shared/FooterDoctor';
import Header from '@/components/shared/Header';

const DoctorCabinetScreen = () => {
  return ( <>
    <View style={styles.container}>

      <Header title='Профиль' isAuthenticated={true} DoctorLogin={true}/>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <DoctorCabinetInfo />
        <DoctorCabinetOptions />
      </ScrollView>

      <FooterDoctor />

      <StatusBar style="auto" />
    </View>
  </> );
};

export default DoctorCabinetScreen;
