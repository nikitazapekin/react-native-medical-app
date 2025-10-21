import {  Text, TextInput, View } from "react-native";

import DroppableList from "../shared/DroppableList";
import DrugsItem from "../shared/DrugsItem";

import { styles } from "./styled";

const sortOptions = [
  { id: "1", label: "По названию", type: "name" },
  { id: "2", label: "По Стоимости", type: "cost" },
  { id: "3", label: "По типу", type: "type" },
];

const medicationItems = [
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
  return (
    <View style={styles.content}>

      <DroppableList sortOptions={sortOptions} />
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Найти..."
          placeholderTextColor="#B0B0B0"
        />

      </View>
      <Text style={styles.title}>Список лекарств</Text>
      <View style={styles.listWrapper}>
        {medicationItems.map((item) => (
          <DrugsItem item={item} key={item.id} />
        ))}
      </View>
    </View>
  );
};

export default MedScreenDrugs; 
