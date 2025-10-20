import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { ListItemProps } from "./types";

import { profileOptions } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const ListItem = ({ item }: ListItemProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    if (item.text.toLocaleLowerCase().includes("история")) {
      navigation.navigate(ROUTES.STACK.PAYMENTS);
    }
  };

  return (
    <Pressable onPress={handleNavigate} style={styles.item}>
      <Image source={item.icon} alt={item.alt} />
      <Text>{item.text}</Text>
    </Pressable>
  );
};

const CabinetOptions = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Категории</Text>
      <View style={styles.list}>
        {profileOptions.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default CabinetOptions;

/*
import { Pressable,Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface HeaderProps {
  title: string;
  isAuthenticated?: boolean
}

const Header = ({ title, isAuthenticated }: HeaderProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    navigation.navigate(ROUTES.STACK.CABINET);
  };

  */
