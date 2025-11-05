import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DroppableList from "../shared/DroppableList";
import DrugsItem from "../shared/DrugsItem";
import SearchInput from "../shared/SearchInput";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = [
  { id: "1", label: "По названию", type: "name" },
  { id: "2", label: "По Стоимости", type: "cost" },
  { id: "3", label: "По типу", type: "type" },
];

interface Drugs {
  id: number;
    title: string;
    description: string;
    price: number;
    type : string;
    dosage: string;
}

const medicationItems: Drugs[] = [
  {
    id: 1,
    title: "Парацетамол",
    price: 150,
    type: "Обезболивающее",
    description: "Жаропонижающее и обезболивающее средство",
    dosage: "500 мг"
  },
  {
    id: 2,
    title: "Парацетамол",
    price: 160,
    type: "Обезболивающее",
    description: "Кайфовое средство",
    dosage: "500 мг"
  },
  {
    id: 3,
    title: "Парацетамол",
    price: 999,
    type: "Обезболивающее",
    description: "Нелегальное средство",
    dosage: "500 мг"
  },
  {
    id: 4,
    title: "Постгрестол",
    price: 200,
    type: "Обезболивающее",
    description: "Средство избавляющее от MySQLWorkbench",
    dosage: "500 мг"
  },
  {
    id: 5,
    title: "Постгрестол",
    price: 200,
    type: "Обезболивающее",
    description: "Средство избавляющее от MySQLWorkbench",
    dosage: "500 мг"
  },
  {
    id: 6,
    title: "Постгрестол",
    price: 200,
    type: "Обезболивающее",
    description: "Средство избавляющее от MySQLWorkbench",
    dosage: "500 мг"
  },
  {
    id: 7,
    title: "Постгрестол",
    price: 200,
    type: "Обезболивающее",
    description: "Средство избавляющее от MySQLWorkbench",
    dosage: "500 мг"
  },
  {
    id: 8,
    title: "Постгрестол",
    price: 200,
    type: "Обезболивающее",
    description: "Средство избавляющее от MySQLWorkbench",
    dosage: "500 мг"
  },
  {
    id: 9,
    title: "Постгрестол",
    price: 200,
    type: "Обезболивающее",
    description: "Средство избавляющее от MySQLWorkbench",
    dosage: "500 мг"
  },

];

const MedScreenDrugs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation<FormNavigationProp>();

  const handleDrugPress = (item: Drugs) => {

    navigation.navigate(ROUTES.STACK.USER_DRUG_DETAIL_SCREEN , {
      drug: item
    });
  };

  return (

    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} />
      <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
      <Text style={styles.title}>Список лекарств</Text>

      <View style={styles.listWrapper}>
        {medicationItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleDrugPress(item)}
            style={ { zIndex: 1 }}
          >
            <DrugsItem item={item} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MedScreenDrugs;
