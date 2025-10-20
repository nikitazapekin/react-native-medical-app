
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import CustomButton from "../shared/Button";
import FormInput from "../shared/FormInput";

import { styles } from "./styled";


import { ROUTES } from "@/navigation/routes";
import { FormNavigationProp } from "@/navigation/types";
import { DOCTOR_EDIT_CONSTANTS } from "@/constants/doctorEdit";



const DoctorEditForm = () => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleDoctorCabinet = () => {
    navigation.navigate(ROUTES.STACK.DOCTOR_CABINET);
  };

  return (
    <View style={styles.centerContent}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Изменить профиль</Text>
        </View>

        <View style={styles.fields}>
          {DOCTOR_EDIT_CONSTANTS.map((item) => (
            <FormInput
              label={item.label}
              handler={() => {}}
              placeholder={item.placeholder}
              type={item.type}
              key={item.id}
            />
          ))}

        </View>
        <View style={styles.btns}>
          
          <CustomButton
            text="Сохранить"
            handler={handleDoctorCabinet}
            backgroundColor="#1280b2"
            
          />
        </View>
      </View>
    </View>
  );
};

export default DoctorEditForm;
