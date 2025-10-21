import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import Calendar from "../shared/Calendar";
import MedicalCardButton from "../shared/MedicalCardButton";

import { styles } from "./styled";

import { medicalCardButtons } from "@/constants";
import type { RootStackParamList } from "@/navigation/types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const MedicalCardComponent = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.title}>Медицинская карта</Text>
        <Calendar />
        <Text style={styles.subtitle}>
          Журнал
        </Text>
        <View style={styles.buttons}>
          {medicalCardButtons.map((item) => (

            <MedicalCardButton key={item.id} item={item}  onPress={() => navigation.navigate(item.screen)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default MedicalCardComponent;
