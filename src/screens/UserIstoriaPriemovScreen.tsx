import React from "react";
import { View } from "react-native";
import type { RouteProp } from "@react-navigation/native";

import { styles } from "./styles";

import IstoriaPriemov from "@/components/IstoriaPriemov";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { RootStackParamList } from "@/navigation/types";

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'UserPriemiHistory'>;

}
export default function UserIstoriaPriemovScreen({ route }: UserEditChildrenProps) {
 
  const { id , selectedDate} = route.params || {};

  console.log("idsss", id, selectedDate);

  return (
    <View style={styles.container}>
      <Header title={"История приемов"} isAuthenticated={true} showBackButton={true}/>
      <View style={styles.content}>
        <IstoriaPriemov  id={String(id)}  selectedDate={selectedDate} />
      </View>
      <Footer />
    </View>
  );
}
