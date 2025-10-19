import { Text, View } from "react-native";
import { styles } from "./styled";
import { PriceItem } from "./types";
const PaymentItem = ({ item }: PriceItem) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.title}> {item.title}</Text>

        <Text style={styles.description}>{item.description} </Text>
      </View>

      <Text style={styles.price}> {item.price}$</Text>
    </View>
  );
};

export default PaymentItem;
