import { useEffect, useState } from "react";
import { Image, Modal,NativeSyntheticEvent,NativeTouchEvent,Text, TouchableOpacity, View } from "react-native";
import MockImage from "@assets/mockPhotos/Avatar.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { Patient } from "./types";

import { getDaysSinceRegistration } from "@/helpers/dateFormat";
import AuthService from "@/http/auth";
import UserService from "@/http/userService";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";
type TouchEvent = NativeSyntheticEvent<NativeTouchEvent>;
const CabinetInfo = () => {
  const [patient, setPatiens] = useState<Patient>();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const navigation = useNavigation<FormNavigationProp>();

  useEffect(() => {
    async function checkAuthAndGetUser() {
      try {
        const token = await AsyncStorage.getItem('accessToken');

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

      } catch {
        navigation.navigate(ROUTES.STACK.AUTH);
      }
    }

    checkAuthAndGetUser().catch(()=> {
      navigation.navigate(ROUTES.STACK.AUTH);
    });
  }, [navigation]);

  const handleDotsPress = (event: TouchEvent) => {

    const { pageX, pageY } = event.nativeEvent;

    setTooltipPosition({ x: pageX -  110, y: pageY -15 });
    setShowTooltip(true);
  };

  const handleEdit = () => {
    setShowTooltip(false);

    navigation.navigate(ROUTES.STACK.USER_EDIT_PROFILE);
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

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

          <TouchableOpacity style={styles.dots} onPress={handleDotsPress}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showTooltip}
        transparent={true}
        animationType="fade"
        onRequestClose={closeTooltip}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeTooltip}
        >
          <View
            style={[
              styles.tooltip,
              {
                position: 'absolute',
                top: tooltipPosition.y,
                left: tooltipPosition.x
              }
            ]}
          >
            <TouchableOpacity style={styles.tooltipItem} onPress={handleEdit}>
              <Text style={styles.tooltipText}>Редактировать</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Text style={styles.citate}>
        Считаю, что залог хорошего здоровья - правильный уход и дисциплина
      </Text>
    </View>
  );
};

export default CabinetInfo;
