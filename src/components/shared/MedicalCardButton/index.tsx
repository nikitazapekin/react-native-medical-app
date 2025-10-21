import { Pressable,Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { MedicalCardButtonProps } from "./types";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const MedicalCardButton = ({ item }: MedicalCardButtonProps) => {

  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    if (item.text.toLocaleLowerCase().includes("болезней")) {
      navigation.navigate(ROUTES.STACK.ISTORIABOLEZNEI);
    }

  };

  return (
    <Pressable onPress={handleNavigate} style={styles.wrapper}>

      <View style={styles.button}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </Pressable>
  );
};

export default MedicalCardButton;

/*

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

    if(item.text.toLocaleLowerCase().includes("дети")) {

      navigation.navigate(ROUTES.STACK.CHILDRENS);
    }

    if(item.text.toLocaleLowerCase().includes("советов")) {

      navigation.navigate(ROUTES.STACK.SPISOKSOVETOV);
    }

  };
  */
