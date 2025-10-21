import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styled";
import type { MedicalCardButtonProps } from "./types";

const MedicalCardButton = ({ item, onPress }: MedicalCardButtonProps) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MedicalCardButton;
