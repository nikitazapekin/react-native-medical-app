import { Text, View } from "react-native";

import Calendar from "../shared/Calendar";

import { styles } from "./styled";

const MedicalCardComponent = () => {
  return <View style={styles.wrapper}>
    <View style={styles.content}>
      <Text style={styles.title}>
  Медицинская карта
      </Text>
      <Calendar />
    </View>
  </View>;
};

export default MedicalCardComponent;
