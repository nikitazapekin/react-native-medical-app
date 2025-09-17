import { useState } from "react";
import { Text, TouchableOpacity,View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import FormInput from "../shared/FormInput";

import { styles } from "./styled";

import { AUTH_CONSTANTS } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const AuthForm = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [isChecked, setIsChecked] = useState(false);
  const handleRegister = () => {
    navigation.navigate(ROUTES.STACK.REGISTER);
  };
  const handleLogin = () => {
    navigation.navigate(ROUTES.STACK.HOMEPAGE);
  };

  return (
    <View style={styles.centerContent}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Авторизация</Text>
        </View>

        <View style={styles.fields}>
          {AUTH_CONSTANTS.map((item) => (
            <FormInput
              label={item.label}
              handler={() => {}}
              type={item.type}
              placeholder={item.placeholder}
              key={item.id}
            />
          ))}
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsChecked(!isChecked)}
            >
              <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>Запомнить</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btns}>
          <CustomButton text="Войти" handler={handleLogin} backgroundColor="#1280b2" />
          <CustomButton
            text="Зарегистрироваться"
            handler={handleRegister}
            backgroundColor="#D1D5DB"
            color="#000"
          />
        </View>
      </View>
    </View>
  );
};

export default AuthForm;
