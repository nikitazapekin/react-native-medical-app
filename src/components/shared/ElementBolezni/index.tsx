import { Text, View } from "react-native";

import { styles } from "./styled";
import type { ElementBolezniProps } from "./types";

const ElementBolezni = ({ item }: ElementBolezniProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );
};

export default ElementBolezni;
