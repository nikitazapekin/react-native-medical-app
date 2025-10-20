import { Text, View, Image } from "react-native";

import { styles } from "./styled";
import { ChildrenItemProps } from "./types";

const ChildrenItem = ({ item }: ChildrenItemProps) => {
  return (
    <View style={styles.wrapper}>
      <Image source={item.img} alt={item.alt} />
      <View style={styles.content}>
        <Text style={styles.title}> {item.name}</Text>
        <Text style={styles.age}>Возраст: {item.age}</Text>
        <Text style={styles.gender}>Пол: {item.gender}</Text>
      </View>
    </View>
  );
};

export default ChildrenItem;
