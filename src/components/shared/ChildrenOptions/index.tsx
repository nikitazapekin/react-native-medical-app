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
    const itemText = item.text.toLocaleLowerCase();

    if (itemText.includes("медицинская карта")) {
      navigation.navigate(ROUTES.STACK.MEDICALCARD, { id: Number(id) });
    } else if (itemText.includes("список консультировавших врачей")) {
      navigation.navigate(ROUTES.STACK.CHILDREN_DOCTORS, { childId: Number(id) });
    } else if (itemText.includes("поликлиника")) {
      navigation.navigate(ROUTES.STACK.CHILDREN_INFORMATION_ABOUT_CLINIC, { childId: Number(id) });
    }
    else if (itemText.includes("общие рекомендации врачей")) {
      navigation.navigate(ROUTES.STACK.USER_RECOMMENDATIONS);
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
