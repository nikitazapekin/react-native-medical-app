
import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { CabinetProps, ListItemProps } from "./types";

import { profileOptions } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const ListItem = ({ item , id }: ListItemProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    const itemText = item.text.toLocaleLowerCase();

    if (itemText.includes("записи в поликлинику") || itemText.includes("мои записи")) {
      navigation.navigate(ROUTES.STACK.USER_APPOINTMENTS);
    }

    if (itemText.includes("история платежей")) {
      navigation.navigate(ROUTES.STACK.PAYMENTS, {id: Number(id)});
    }

    if(itemText.includes("дети")) {
      navigation.navigate(ROUTES.STACK.CHILDRENS);
    }

    if(itemText.includes("советов")) {
      navigation.navigate(ROUTES.STACK.USER_SPISOK_SOVETOV);
    }

    if(itemText.includes("избранное")) {
      navigation.navigate(ROUTES.STACK.USER_FAVOURITE_DRUGS, { id: Number(id) });
    }
  };

  return (
    <Pressable onPress={handleNavigate} style={styles.item}>
      <Image source={item.icon} alt={item.alt} />
      <Text>{item.text}</Text>
    </Pressable>
  );
};

const CabinetOptions = ({id}: CabinetProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Категории</Text>
      <View style={styles.list}>
        {profileOptions.map((item) => (
          <ListItem key={item.id} item={item} id={id} />
        ))}
      </View>
    </View>
  );
};

export default CabinetOptions;
