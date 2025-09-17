import { useState } from "react";
import { Text, TouchableOpacity,View } from "react-native";

import CustomButton from "../shared/Button";
import FormInput from "../shared/FormInput";

import { styles } from "./styled";

import { AUTH_CONSTANTS } from "@/constants";

const AuthForm = () => {
  const [isChecked, setIsChecked] = useState(false);

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
          <CustomButton text="Войти" handler={() => {}} backgroundColor="#1280b2" />
          <CustomButton
            text="Зарегистрироваться"
            handler={() => {}}
            backgroundColor="#D1D5DB"
            color="#000"
          />
        </View>
      </View>
    </View>
  );
};

export default AuthForm;
