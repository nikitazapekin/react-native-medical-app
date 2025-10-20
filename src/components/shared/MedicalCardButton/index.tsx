import { Text, View } from "react-native";

import { styles } from "./styled";
import type { MedicalCardButtonProps } from "./types";

const MedicalCardButton = ({ item }: MedicalCardButtonProps) => {
  return (
    <View style={styles.wrapper}>

      <View style={styles.button}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );
};

export default MedicalCardButton;
