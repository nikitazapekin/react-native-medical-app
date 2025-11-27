import { Text, View } from "react-native";

import { styles } from "./styled";
import type { ElementBolezniProps } from "./types";

const ElementBolezni = ({ item }: ElementBolezniProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export default ElementBolezni;
