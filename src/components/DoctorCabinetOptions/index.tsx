import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";

import { styles } from "./styled";

import DoctorInfoService from "@/http/doctorInfo";
import type { Doctor } from "@/http/types/personInfo";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const DoctorCabinetOptions = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorInfo = async () => {
      try {
        setLoading(true);
        const doctorData = await DoctorInfoService.getCurrentDoctor();

        setDoctor(doctorData);
      } catch (err) {
        console.error("Error loading doctor info:", err);
      } finally {
        setLoading(false);
      }
    };

    void loadDoctorInfo();
  }, []);

  const handleDoctorScreen = () => {
    navigation.navigate(ROUTES.STACK.DOCTOR_CABINET_EDIT);
  };

  const handleLogout = () => {
    Alert.alert(
      "Выход из аккаунта",
      "Вы уверены, что хотите выйти?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Выйти",
          style: "destructive",
          onPress: async () => {
            try {
             
              await AsyncStorage.multiRemove([
                'accessToken',
                'userRole',
                'userEmail',
                'userId',
                'id',
                'childId',
                'childrenList',
              ]);

         
              navigation.reset({
                index: 0,
                routes: [{ name: ROUTES.STACK.AUTH }],
              });
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Ошибка', 'Не удалось выйти из аккаунта');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.mainWrapper}>
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" color="#1280b2" />
        </View>
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={styles.mainWrapper}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Информация о враче не найдена</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Информация о враче</Text>

        <View style={styles.section}>
          {doctor.experience !== undefined && doctor.experience !== null && (
            <View style={styles.infoRow}>
              <Text style={styles.value}>
                <Text style={styles.label}>Опыт работы: </Text>
                {doctor.experience} {doctor.experience === 1 ? "год" : doctor.experience < 5 ? "года" : "лет"}
              </Text>
            </View>
          )}

          {doctor.education && (
            <View style={styles.infoRow}>
              <Text style={styles.value}>
                <Text style={styles.label}>Образование: </Text>
                {doctor.education}
              </Text>
            </View>
          )}

          {doctor.specialization && (
            <View style={styles.infoRow}>
              <Text style={styles.value}>
                <Text style={styles.label}>Специализация: </Text>
                {doctor.specialization}
              </Text>
            </View>
          )}

          {doctor.achievements && (
            <View style={styles.infoRow}>
              <Text style={styles.value}>
                <Text style={styles.label}>Достижения: </Text>
                {doctor.achievements}
              </Text>
            </View>
          )}

          {doctor.incrementQualification && (
            <View style={styles.infoRow}>
              <Text style={styles.value}>
                <Text style={styles.label}>Повышение квалификации: </Text>
                {doctor.incrementQualification}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            handler={handleDoctorScreen}
            text="Редактировать профиль"
            backgroundColor="#1280b2"
          />
          <CustomButton
            handler={handleLogout}
            text="Выйти из аккаунта"
            backgroundColor="#993B4A"
          />
        </View>
      </View>
    </View>
  );
};

export default DoctorCabinetOptions;
