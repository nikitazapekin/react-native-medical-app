import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { ChildrenItemProps } from "./types";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const ChildrenItem = ({ item }: ChildrenItemProps) => {
  const navigation = useNavigation<FormNavigationProp>();
  const handleNavigate = () => {
    navigation.navigate(ROUTES.STACK.CHILDREN);
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

/*

import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { ListItemProps } from "./types";

import { profileOptions } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    if (item.text.toLocaleLowerCase().includes("история")) {
      navigation.navigate(ROUTES.STACK.PAYMENTS);
    }

    if(item.text.toLocaleLowerCase().includes("дети")) {

      navigation.navigate(ROUTES.STACK.CHILDRENS);
    }

  };

  */
