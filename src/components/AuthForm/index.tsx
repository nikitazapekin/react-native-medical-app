import { useState } from "react";
import { Alert,Text, TouchableOpacity, View } from "react-native";
// import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "@components/shared/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import FormInput from "../shared/FormInput";

import { styles } from "./styled";
import type { LoginFormData } from "./types";

import AuthService from "@/http/auth";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const AuthForm = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [loading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });

  const handleRegister = () => {
    navigation.navigate(ROUTES.STACK.REGISTER);
  };

  const handleLogin = async () => {
    // navigation.navigate(ROUTES.STACK.HOMEPAGE);
    if (!formData.email || !formData.password) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля");

      return;
    }

    setLoading(true);

    try {
      await AuthService.login(formData);

      const userRole = await AsyncStorage.getItem('userRole');

      Alert.alert("Успех", "Вход выполнен успешно!");

      if (userRole === 'DOCTOR') {

        navigation.navigate(ROUTES.STACK.DOCTOR);
      } else {

        navigation.navigate(ROUTES.STACK.HOMEPAGE);
      }

    } catch{

      Alert.alert("Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <View style={styles.centerContent}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Авторизация</Text>
        </View>

        <View style={styles.fields}>
          <FormInput
            label="Почта"
            handler={(value) => handleInputChange('email', value)}
            type="email"
            placeholder="Почта"
            value={formData.email}
          />
          <FormInput
            label="Пароль"
            handler={(value) => handleInputChange('password', value)}
            //   type="password"
            placeholder="Пароль"
            value={formData.password}
          />
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
          <CustomButton
            text={loading ? "Вход..." : "Войти"}
            handler={handleLogin}
            backgroundColor="#1280b2"
            disabled={loading}
          />
          <CustomButton
            text="Зарегистрироваться"
            handler={handleRegister}
            backgroundColor="#D1D5DB"
            color="#000"
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthForm;
