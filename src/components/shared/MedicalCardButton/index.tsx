import { Text, View } from "react-native";
import { MedicalCardButtonProps } from "./types";
import { styles } from "./styled";

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
