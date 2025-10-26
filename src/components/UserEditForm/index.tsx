import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import FormInput from "../shared/FormInput";

import { styles } from "./styled";

import { USER_EDIT_CONSTANTS } from "@/constants";
 
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const UserEditForm = () => {
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
          {USER_EDIT_CONSTANTS.map((item) => (
            <FormInput
              label={item.label}
              handler={() => {}}
              placeholder={item.placeholder}
              type={item.type}
              key={item.id}
              value={""}
            />
          ))}
        </View>
        <View style={styles.btns}>
          <CustomButton text="Сохранить" handler={handleDoctorCabinet} backgroundColor="#1280b2" />
        </View>
      </View>
    </View>
  );
};

export default UserEditForm;
