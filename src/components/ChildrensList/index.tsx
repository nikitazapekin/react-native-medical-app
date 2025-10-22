import { View } from "react-native";
import { Text } from "react-native";
import Children from "@assets/mockPhotos/ChildrenImg.png";

import ChildrenItem from "../shared/ChildrenItem";
import DroppableList from "../shared/DroppableList";

import { styles } from "./styled";

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
  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} />

      <Text style={styles.title}>Список детей</Text>
      <View style={styles.wrapper}>

        {childrens.map((item)=> (
          <ChildrenItem
            key={item.id}
            item={item}
          />
        ))}

      </View>
    </View>
  );
};

export default ChildrensList;
