import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import ChildrenComponentBanner from "../ChildrenComponentBanner";
import CustomButton from "../shared/Button";
import ChildrenOptions from "../shared/ChildrenOptions";

import { styles } from "./styled";
import type { ChildrenComponentTypes } from "./types";

import ChildrenService from "@/http/children";
import type { ChildFull } from "@/http/types/childFull";

const ChildrenComponent = ({ id }: ChildrenComponentTypes) => {
  const [children, setChildren] = useState<ChildFull>();

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

  return (
    <View style={styles.wrapper}>
      <ChildrenComponentBanner   children={children}/>

      <Text style={styles.title}>О ребенке </Text>

<<<<<<< HEAD
      <ChildrenOptions children={children} />
=======
      <ChildrenOptions  id={String(id)}  />
>>>>>>> 8575d3a1512b51905eb69a4eafdd37536ffdd36a

      <CustomButton handler={() => {}} color="#fff" text="Удалить профиль ребенка" />
    </View>
  );
};

export default ChildrenComponent;
