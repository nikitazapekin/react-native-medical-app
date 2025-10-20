import { Text, View } from "react-native";

import Calendar from "../shared/Calendar";
import MedicalCardButton from "../shared/MedicalCardButton";

import { styles } from "./styled";

import { medicalCardButtons } from "@/constants";

const MedicalCardComponent = () => {
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
            <MedicalCardButton key={item.id} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default MedicalCardComponent;
