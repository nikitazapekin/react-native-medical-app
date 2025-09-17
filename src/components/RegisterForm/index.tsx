 
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import CustomButton from "../shared/Button";
import FormInput from "../shared/FormInput";

import { styles } from "./styled";

import { REGISTER_CONSTANTS } from "@/constants";
import { ROUTES } from "@/navigation/routes";

export type RootStackParamList = {
  Home: undefined;
  [ROUTES.STACK.MAIN]: undefined;
  [ROUTES.STACK.AUTH]: undefined;
  [ROUTES.STACK.REGISTER]: undefined;
};
type AuthFormNavigationProp = StackNavigationProp<RootStackParamList>;

const RegisterForm = () => {
  const navigation = useNavigation<AuthFormNavigationProp>();

  const handleRegister = () => {
    navigation.navigate(ROUTES.STACK.REGISTER);
  };

  return (
    <View style={styles.centerContent}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Регистрация</Text>
        </View>

        <View style={styles.fields}>
          {REGISTER_CONSTANTS.map((item) => (
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
          <CustomButton text="Зарегистрироваться" handler={() => {}} backgroundColor="#1280b2" />
          <CustomButton
            text="Войти"
            handler={handleRegister}
            backgroundColor="#D1D5DB"
            color="#000"
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;
