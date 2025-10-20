import { View } from "react-native";
import { Text } from "react-native";
import Children from "@assets/mockPhotos/ChildrenImg.png";
import DroppableList from "../shared/DroppableList";

import { styles } from "./styled";
import ChildrenItem from "../shared/ChildrenItem";

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
        {/*     {paymentItems.map((item) => (
          <PaymentItem item={item} key={item.id} />
        ))} */}
      </View>
    </View>
  );
};

export default ChildrensList;

/*
import { View, Text } from "react-native";

import DroppableList from "../shared/DroppableList";

import { styles } from "./styled";
import PaymentItem from "../shared/PaymentItem";

const sortOptions = [
  { id: "1", label: "По рейтингу", type: "rate" },
  { id: "2", label: "По Стоимости", type: "cost" },
  { id: "3", label: "По дате выхода", type: "relise" },
];

const paymentItems = [
  { id: 1, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 2, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 3, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 4, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 5, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 6, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 7, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 8, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 9, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 10, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 11, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
  { id: 12, title: "Консультация 1", description: "Врач: Федоровна Н А", price: 123 },
];
const PaymentsHistory = () => {
  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} />

      <Text style={styles.title}>История платежей</Text>
      <View style={styles.wrapper}>
        {paymentItems.map((item) => (
          <PaymentItem item={item} key={item.id} />
        ))}
      </View>
    </View>
  );
};

export default PaymentsHistory;

*/
