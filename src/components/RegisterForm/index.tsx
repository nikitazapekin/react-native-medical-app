import { useState } from "react";
import { Alert,Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import CustomButton from "../shared/Button";
import FormInput from "../shared/FormInput";

import { styles } from "./styled";
import type { RegisterFormData } from "./types";

import AuthService from "@/http/auth";
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "PATIENT"
  });

  const handleLogin = () => {
    navigation.navigate(ROUTES.STACK.AUTH);
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async () => {

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все обязательные поля");

      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Ошибка", "Пароль должен содержать минимум 6 символов");

      return;
    }

    setLoading(true);

    try {
      await AuthService.register(formData);
      Alert.alert("Успех", "Регистрация прошла успешно!", [
        {
          text: "OK",
          onPress: () => navigation.navigate(ROUTES.STACK.AUTH)
        }
      ]);
    } catch   {
      Alert.alert("Ошибка регистрации", );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.centerContent}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Регистрация</Text>
        </View>

        <View style={styles.fields}>
          <FormInput
            label="Имя"
            handler={(value) => handleInputChange('firstName', value)}
            placeholder="Имя"
            type="name"
            value={formData.firstName}
          />
          <FormInput
            label="Фамилия"
            handler={(value) => handleInputChange('lastName', value)}
            placeholder="Фамилия"
            type="surname"
            value={formData.lastName}
          />
          <FormInput
            label="Телефон"
            handler={(value) => handleInputChange('phoneNumber', value)}
            placeholder="Телефон"
            type="tel"
            value={formData.phoneNumber}
          />
          <FormInput
            label="Почта"
            handler={(value) => handleInputChange('email', value)}
            placeholder="Почта"
            type="email"
            value={formData.email}
          />
          <FormInput
            label="Пароль"
            handler={(value) => handleInputChange('password', value)}
            placeholder="Пароль"
            type="password"
            value={formData.password}
          />
        </View>
        <View style={styles.btns}>
          <CustomButton
            text={loading ? "Регистрация..." : "Зарегистрироваться"}
            handler={handleRegister}
            backgroundColor="#1280b2"
            disabled={loading}
          />
          <CustomButton
            text="Войти"
            handler={handleLogin}
            backgroundColor="#D1D5DB"
            color="#000"
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;
/* import { Text, View } from "react-native";
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

  const handleLogin = () => {
    navigation.navigate(ROUTES.STACK.AUTH);
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
          <CustomButton text="Войти" handler={handleLogin} backgroundColor="#D1D5DB" color="#000" />
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;
 */
