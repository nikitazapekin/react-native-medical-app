import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import ChildrenComponentBanner from "../ChildrenComponentBanner";
import CustomButton from "../shared/Button";
import ChildrenOptions from "../shared/ChildrenOptions";

import { styles } from "./styled";
import type { ChildrenComponentTypes } from "./types";

import ChildrenService from "@/http/children";
import type { ChildFull } from "@/http/types/childFull";
import { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

const ChildrenComponent = ({ id }: ChildrenComponentTypes) => {
  const [children, setChildren] = useState<ChildFull>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const handleGetInfo = async () => {

      try {
        const resp = await ChildrenService.getFullInfo(id);

        setChildren(resp);
      } catch {
        Alert.alert("Error");
      }
    };

    handleGetInfo().catch(() => Alert.alert("Something went wrong"));
  }, [id]);

  const handleDeleteChild = async () => {
    Alert.alert(
      "Удаление профиля",
      "Вы уверены, что хотите удалить профиль ребенка?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            try {
              await ChildrenService.deleteChild(id);
              Alert.alert("Успешно", "Профиль ребенка удален", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate(ROUTES.STACK.CHILDRENS)
                }
              ]);
            } catch (_error) {
              Alert.alert("Ошибка", "Не удалось удалить профиль ребенка");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <ChildrenComponentBanner   children={children}/>

      <Text style={styles.title}>О ребенке </Text>

      <ChildrenOptions  id={String(id)}  />

      <CustomButton handler={handleDeleteChild} color="#fff" text="Удалить профиль ребенка" fullWidth={false} />
    </View>
  );
};

export default ChildrenComponent;
