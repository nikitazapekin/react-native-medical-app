import { Text, View } from "react-native";

import { styles } from "./styled";
import type { DrugsItem } from "./types";

const DrugstItem = ({ item }: DrugsItem) => {
  const displayDescription = item.shortDescription || item.description || "";

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        {displayDescription ? (
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {displayDescription}
          </Text>
        ) : null}
      </View>

      <Text style={styles.price}>{item.price} ₽</Text>
    </View>
  );
};

export default DrugstItem;
