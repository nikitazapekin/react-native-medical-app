import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type {  ListItemProps } from "./types";

import { childrenOptions } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const ChildrenItem = ({ item }: ListItemProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    if (item.text.toLocaleLowerCase().includes("медицинская")) {
      navigation.navigate(ROUTES.STACK.MEDICALCARD);
    }
  };

  return (
    <Pressable onPress={handleNavigate} style={styles.item}>
      <Image source={item.icon} alt={item.alt} />
      <Text>{item.text}</Text>
    </Pressable>
  );
};

const ChildrenOptions = ( ) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.list}>
        {childrenOptions.map((item) => (
          <ChildrenItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default ChildrenOptions;

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
