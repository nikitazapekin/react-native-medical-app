import { Pressable, Text } from "react-native";

import { styles } from "./styled";
import type { OprosButtonTypes } from "./types";

const OprosButton = ({ id, text, handler, isSelected = false }: OprosButtonTypes) => {
  return (
    <Pressable 
      onPress={handler} 
      style={[
        styles.wrapper,
        isSelected && styles.selectedWrapper
      ]}
    >
      <Text style={[
        styles.text,
        isSelected && styles.selectedText
      ]}>
        {id}. {text}
      </Text>
    </Pressable>
  );
};

export default OprosButton;
 