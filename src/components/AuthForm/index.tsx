import { View } from "react-native";

import CustomButton from "../shared/Button";

import { styles } from "./styled";

const AuthForm = () => {
  return (
    <View style={styles.centerContent}>
      <CustomButton text="Войти" handler={() => {}}
        backgroundColor="#1280b2"
      />
      <CustomButton text="Зарегистрироваться" handler={() => {}}
        backgroundColor="#D1D5DB"
        color="#000"
      />
    </View>
  );
};

export default AuthForm;
