import Header from "@/components/shared/Header";
import { View } from "react-native";
import { styles } from "./styles";
import FooterDoctor from "@/components/shared/FooterDoctor";
import { StatusBar } from "expo-status-bar";
import DoctorEditForm from "@/components/DoctorEditForm";



const DoctorEditCabinet = () => {
  return (
    <View style={styles.container}>

      <Header
        title="Профиль"
        isAuthenticated={true}
        DoctorLogin={true}>

      </Header>
      <DoctorEditForm/>
      

      <FooterDoctor></FooterDoctor>
      <StatusBar style="auto" />
    </View>
  );
};

export default DoctorEditCabinet;
