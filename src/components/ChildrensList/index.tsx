import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import ChildrenItem from "../shared/ChildrenItem";
import DroppableList from "../shared/DroppableList";
import type { Child } from "../UserEditChildren/types";

import { styles } from "./styled";

import ChildrenService from "@/http/children";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = [
  { id: "1", label: "По возрасту", type: "age" },
  { id: "2", label: "По имени", type: "name" },
];

const ChildrensList = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [children, setChildren] = useState<Child[]>([]);
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

  useEffect(() => {
    const loadCurrentPatientAndChildren = async () => {
      try {
        const childrenData = await ChildrenService.getChildrenByParentId(Number(id));

        setChildren(childrenData);
        setSortedChildren(childrenData);
      } catch  {

        Alert.alert('Ошибка', 'Не удалось загрузить данные');
      }
    };

    loadCurrentPatientAndChildren().catch(() => console.log("error"));
  }, [id]);

  const sortChildren = (childrenList: Child[], sortBy: string) => {
    const sorted = [...childrenList];

    switch (sortBy) {
      case "age":
        return sorted.sort((a, b) => parseInt(String(a.age)) - parseInt(String(b.age)));

      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      default:
        return sorted;
    }
  };

  const [sortedChildren, setSortedChildren] = useState<Child[]>([]);

  const [sortType, setSortType] = useState<string>("");
  const handleSortChange = (selectedOption: { id: string; label: string; type?: string }) => {
    if (selectedOption.type) {
      setSortType(selectedOption.type);
      const sorted = sortChildren(children, selectedOption.type);

      setSortedChildren(sorted);
    }
  };

  useEffect(() => {
    if (sortType) {
      const sorted = sortChildren(children, sortType);

      setSortedChildren(sorted);
    } else {
      setSortedChildren(children);
    }
  }, [children, sortType]);

  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions}
        handler={handleSortChange}
      />

      <Text style={styles.title}>Список детей</Text>
      <View style={styles.wrapper}>

        {sortedChildren.map((child) => (
          <ChildrenItem
            key={child.id}
            item={{
              id: child.id.toString(),
              img: child.avatar ? { uri: child.avatar } : require('@assets/mockPhotos/ChildrenImg.png'),
              alt: "Children",
              name: child.name,
              age: child.age.toString(),
              gender: child.gender
            }}

          />
        ))}
      </View>

      <CustomButton text="Редактировать" handler={handleNavigate} backgroundColor="#1280B2" />
    </View>
  );
};

export default ChildrensList;
