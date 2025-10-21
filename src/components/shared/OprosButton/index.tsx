import { Pressable,Text } from "react-native";

import { styles } from "./styled";
import type { OprosButtonTypes } from "./types";

const OprosButton = ({ id, text, handler }: OprosButtonTypes) => {
  return (
    <Pressable onPress={handler} style={styles.wrapper}>
      <Text style={styles.text}>
        {id}. {text}
      </Text>
    </Pressable>
  );
};

export default OprosButton;
