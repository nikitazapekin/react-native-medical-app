import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const DoctorCabinetOptions = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const handleDoctorScreen = () => {
    navigation.navigate(ROUTES.STACK.DOCTOR_CABINET_EDIT);
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Информация о враче</Text>

        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.value}>
              <Text style={styles.label}>Опыт работы: </Text>
              5 лет
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.value}>
              <Text style={styles.label}>Образование: </Text>
              БГМУ (2013-2019)
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.value}>
              <Text style={styles.label}>Специализация: </Text>
              Невропатология
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.value}>
              <Text style={styles.label}>Достижения: </Text>
              Автор 10 научных публикаций в области малоинвазивной хирургии. Защитил диссертацию в области хирургии.
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.value}>
              <Text style={styles.label}>Повышение квалификации: </Text>
              Повышение квалификации по лапароскопической хирургии, 2020
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            handler={handleDoctorScreen}
            text="Редактировать профиль"
            backgroundColor="#1280b2"
          />
        </View>
      </View>
    </View>
  );
};

export default DoctorCabinetOptions;
