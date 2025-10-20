import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import DoctorEditForm from "@/components/DoctorEditForm";
import FooterDoctor from "@/components/shared/FooterDoctor";
import Header from "@/components/shared/Header";

const DoctorEditCabinet = () => {
  return (
    <View style={styles.container}>
      <Header title="Редактировать профиль" isAuthenticated={true} DoctorLogin={true}></Header>
      <DoctorEditForm />

      <FooterDoctor></FooterDoctor>
      <StatusBar style="auto" />
    </View>
  );
};

export default DoctorEditCabinet;
