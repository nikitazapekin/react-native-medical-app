import { View } from "react-native";

import { styles } from "./styles";

import DoctorEditForm from "@/components/DoctorEditForm";
import FooterDoctor from "@/components/shared/FooterDoctor";
import Header from "@/components/shared/Header";

const DoctorEditCabinet = () => {
  return (
    <View style={styles.container}>
      <Header title="Редактировать профиль" isAuthenticated={true} DoctorLogin={true} showBackButton={true}></Header>
      <DoctorEditForm />

      <FooterDoctor></FooterDoctor>    
    </View>
  );
};

export default DoctorEditCabinet;
