import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MockImage from "../../../assets/mockPhotos/Avatar.png";

import { styles } from "./styled";
import type { DialogTypes } from "./types";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const DialogItem = ({ item }: DialogTypes) => {
  const navigation = useNavigation<FormNavigationProp>();
  const handleNavigate = () => {
    navigation.navigate(ROUTES.STACK.CHAT, {id: item.id});
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleNavigate}>
      <View style={styles.card}>
        <View style={styles.main}>
          <Image source={MockImage} resizeMode="contain" />
          <View style={styles.content}>
            <Text style={styles.author}>{item.id} {item.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>

          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default DialogItem;

/*

const Header = ({ title, isAuthenticated }: HeaderProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    navigation.navigate(ROUTES.STACK.CABINET);
  };

  return (
    <View style={styles.header}>
      {isAuthenticated && (
        <Pressable
          style={styles.circle}
          onPress={handleNavigate}
        />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

*/
