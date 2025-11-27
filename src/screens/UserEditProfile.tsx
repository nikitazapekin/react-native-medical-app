import { View } from "react-native";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import UserEditForm from "@/components/UserEditForm";

const UserEditCabinet = () => {
  return (
    <View style={styles.container}>
      <Header title="Редактировать профиль" isAuthenticated={true} DoctorLogin={true} showBackButton={true}></Header>
      <UserEditForm />

      <Footer />    
    </View>
  );
};

export default UserEditCabinet;
