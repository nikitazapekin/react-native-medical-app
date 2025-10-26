import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Text } from "react-native";
 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import ChildrenItem from "../shared/ChildrenItem";
import DroppableList from "../shared/DroppableList";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";
import { Child } from "../UserEditChildren/types";
import ChildrenService from "@/http/children";

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
      } catch  {

        Alert.alert('Ошибка', 'Не удалось загрузить данные');
      }
    };

    loadCurrentPatientAndChildren().catch(() => console.log("error"));
  }, [id]);



  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} />

      <Text style={styles.title}>Список детей</Text>
      <View style={styles.wrapper}>
 

           {children.map((child) => (
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
 