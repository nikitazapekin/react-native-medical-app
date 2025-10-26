import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import Children from "@assets/mockPhotos/ChildrenImg.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import ChildrenItem from "../shared/ChildrenItem";
import DroppableList from "../shared/DroppableList";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = [
  { id: "1", label: "По возрасту", type: "age" },
  { id: "2", label: "По имени", type: "name" },
];

const childrens = [
  { id: "1", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "2", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "3", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "4", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "5", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "6", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "7", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "8", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "9", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
];
const ChildrensList = () => {
  const navigation = useNavigation<FormNavigationProp>();
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

  useEffect(() => {
    handleLoadId().catch(()=>console.log("err"));
  }, []);

  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} />

      <Text style={styles.title}>Список детей</Text>
      <View style={styles.wrapper}>
        {childrens.map((item) => (
          <ChildrenItem key={item.id} item={item} />
        ))}
      </View>

      <CustomButton text="Редактировать" handler={handleNavigate} backgroundColor="#1280B2" />
    </View>
  );
};

export default ChildrensList;

/*
 const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    if (item.text.toLocaleLowerCase().includes("история")) {
      navigation.navigate(ROUTES.STACK.PAYMENTS);
      */
