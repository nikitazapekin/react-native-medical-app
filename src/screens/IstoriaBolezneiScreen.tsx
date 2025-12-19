import React from 'react';
import { View } from "react-native";
import type { RouteProp } from '@react-navigation/native';

import { styles } from "./styles";

import IstoriaBoleznei from '@/components/IstoriaBoleznei';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import type { RootStackParamList } from '@/navigation/types';

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'IstoriaBoleznei'>;

}

export default function IstoriaBolezneiScreen({ route }: UserEditChildrenProps) {
  const { id , selectedDate} = route.params || {};

  console.log("id", id, selectedDate);

  return (
    <View style={styles.container}>
      <Header title={"История болезней"} isAuthenticated={true} showBackButton={true}/>
      <View style={styles.content}>
        <IstoriaBoleznei id={String(id)} selectedDate={ selectedDate} />
      </View>
      <Footer />
    </View>
  );
}
