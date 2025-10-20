import { Text,View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const DoctorCabinetOptions = () => {

  const navigation = useNavigation<FormNavigationProp>();
  const handleDoctorScreen = () => {
    navigation.navigate(ROUTES.STACK.DOCTOR_APPOINTMENTS);
  };

  return (
    <View style={styles.mainWrapper}>

      <View style={styles.wrapper}>
        <Text style={styles.title}>Информация о враче</Text>

        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Опыт работы:</Text>
            <Text style={styles.value}>5 лет</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Образование:</Text>
            <Text style={styles.value}>БГМУ (2013-2019)</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Специализация:</Text>
            <Text style={styles.value}>Невропатология</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>Достижения:</Text>
              <Text style={styles.valueMultiline}>
            Автор 10 научных публикаций в области малоинвазивной хирургии. Защитил диссертацию в области хирургии.
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>Повышение квалификации:</Text>
              <Text style={styles.valueMultiline}>
            Повышение квалификации по лапароскопической хирургии, 2020
              </Text>
            </View>
          </View>
        </View>

      </View>

      <View style={styles.gap} />
      <CustomButton handler={handleDoctorScreen} text="Редактировать профиль" backgroundColor="#1280b2" />

    </View>

  );
};

export default DoctorCabinetOptions;
