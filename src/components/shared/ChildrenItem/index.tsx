import { Image,Pressable,Text, View } from "react-native";

import { styles } from "./styled";
import type { ChildrenItemProps } from "./types";

const ChildrenItem = ({ item }: ChildrenItemProps) => {
  const handleNavigate = ()=> {

  };

  return (
    <Pressable onPress={handleNavigate} style={styles.wrapper}>
      <Image source={item.img} alt={item.alt} />
      <View style={styles.content}>
        <Text style={styles.title}> {item.name}</Text>
        <Text style={styles.age}>Возраст: {item.age}</Text>
        <Text style={styles.gender}>Пол: {item.gender}</Text>
      </View>
    </Pressable>
  );
};

export default ChildrenItem;
