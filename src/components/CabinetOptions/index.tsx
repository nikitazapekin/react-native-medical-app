import { profileOptions } from "@/constants";
import { View, Image, Text } from "react-native";
import { styles } from "./styled";
import { ListItemProps } from "./types";
const ListItem = ({ item }: ListItemProps) => {
  return (
    <View style={styles.item}>
      <Image source={item.icon} alt={item.alt} />
      <Text>{item.text}</Text>
    </View>
  );
};

const CabinetOptions = () => {
  return (
    <View style={styles.wrapper}>
<Text style={styles.text}>
  Категории
</Text>
    <View style={styles.list}>
      {profileOptions.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </View>
    </View>
  );
};

export default CabinetOptions;
