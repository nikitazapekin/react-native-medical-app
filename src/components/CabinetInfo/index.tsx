import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import MockImage from "@assets/mockPhotos/Avatar.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { Patient } from "./types";

import AuthService from "@/http/auth";
import UserService from "@/http/userService";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";
import { getDaysSinceRegistration } from "@/helpers/dateFormat";

const CabinetInfo = () => {
  const [patient, setPatiens] = useState<Patient>();
  const navigation = useNavigation<FormNavigationProp>();

  useEffect(() => {
    async function checkAuthAndGetUser() {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        console.log("🔑 Current token:", token);

        if (!token) {

          navigation.navigate(ROUTES.STACK.AUTH);

          return;
        }

        const t = await AuthService.validateToken();

        if (t.accessToken !== "Token is valid") {

          navigation.navigate(ROUTES.STACK.AUTH);

          return;
        }

        const userData = await UserService.getCurrentUser();

        setPatiens(userData);

      } catch   {

        navigation.navigate(ROUTES.STACK.AUTH);
      }
    }

    checkAuthAndGetUser().catch(()=> {
      navigation.navigate(ROUTES.STACK.AUTH);
    });
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <View style={styles.main}>
          <Image style={styles.image} source={MockImage} alt="Image" resizeMode="contain" />

          <View style={styles.info}>
            <Text style={styles.title}>
              {patient?.firstName} {patient?.lastName}
            </Text>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Зарегистрирован(а):</Text>
              <Text style={styles.registrationBold}> {getDaysSinceRegistration(String(patient?.createdAt))}</Text>
            </View>

            <Text style={styles.location}>{patient?.region ? patient.region : "Город не указан"}</Text>

            <Text style={styles.tel}>{patient?.phoneNumber}</Text>
          </View>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
      <Text style={styles.citate}>
        Считаю, что залог хорошего здоровья - правильный уход и дисциплина
      </Text>
    </View>
  );
};

export default CabinetInfo; 
