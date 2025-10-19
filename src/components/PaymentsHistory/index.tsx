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
