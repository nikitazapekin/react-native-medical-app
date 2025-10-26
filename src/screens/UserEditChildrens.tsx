import {   View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import UserEditChildrenComponent from "@/components/UserEditChildren";
import type { RootStackParamList } from "@/navigation/types";
 
interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'USER_EDIT_CHILDRESN'>;

}
const UserEditChildren = ({ route }: UserEditChildrenProps) => {
  const { id } = route.params || {};

  return (
    <View style={styles.container}>
      <Header title="Редактировать" isAuthenticated={true} DoctorLogin={true}></Header>
      <UserEditChildrenComponent id={String(id)}/>

      <Footer />
      <StatusBar style="auto" />
    </View>
  );
};

export default UserEditChildren;
