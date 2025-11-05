import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { ListItemProps } from "./types";

import { childrenOptions } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const ChildrenItem = ({ item, id }: ListItemProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    if (item.text.toLocaleLowerCase().includes("медицинская")) {
      navigation.navigate(ROUTES.STACK.MEDICALCARD, { id: Number(id) });
    }
  };

  return (
    <Pressable onPress={handleNavigate} style={styles.item}>
      <Image source={item.icon} alt={item.alt} />
      <Text>{item.text}</Text>
    </Pressable>
  );
};

interface Props {
  id: string;
}
const ChildrenOptions = ({ id }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.list}>
        {childrenOptions.map((item) => (
          <ChildrenItem key={item.id} item={item} id={id} />
        ))}
      </View>
    </View>
  );
};

export default ChildrenOptions;
