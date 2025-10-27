 
import { Image, Pressable, Text, View } from "react-native";
 
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { ChildrenItemProps } from "./types";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const ChildrenItem = ({ item, openModal }: ChildrenItemProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handlePress = () => {
    if (openModal) {
      openModal();
    } else {
      navigation.navigate(ROUTES.STACK.CHILDREN, { id: Number(item.id) });
    }
  };

  const getImageSource = () => {
    if (typeof item.img === "string") {
      return { uri: item.img };
    }

    return item.img;
  };

  return (
    <Pressable onPress={handlePress} style={styles.wrapper}>
      <Image source={getImageSource()} alt={item.alt} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.age}>Возраст: {item.age}</Text>
        <Text style={styles.gender}>Пол: {item.gender}</Text>
      </View>
    </Pressable>
  );
};

export default ChildrenItem;

/*

  const [id, setId] = useState<string>("");
  const handleNavigate = () => {
    navigation.navigate(ROUTES.STACK.USER_EDIT_CHILDRESN, { id: Number(id) });
  };
  const handleLoadId = async () => {
    const id = await AsyncStorage.getItem("id");

    if (typeof id == "string") {
      setId(id);
    }
  };

  */
