import { useEffect, useState } from "react";
import { Alert, FlatList,Text, View } from "react-native";

import DroppableList from "../shared/DroppableList";
import PaymentItem from "../shared/PaymentItem";

import { styles } from "./styled";
import type { PaymentHistoryProps } from "./types";

import PaymentService from "@/http/payment";
import type { PaymentHistory } from "@/http/types/payment";

const sortOptions = [
  { id: "1", label: "По рейтингу", type: "rate" },
  { id: "2", label: "По Стоимости", type: "cost" },
  { id: "3", label: "По дате выхода", type: "relise" },
];

const PaymentsHistory = ({ id }: PaymentHistoryProps) => {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);

  useEffect(() => {
    const handleGet = async () => {
      try {

        const resp = await PaymentService.getPaymentsByPatientId(Number(id));

        setPayments(resp || []);
      } catch (error) {
        console.error("Error fetching payments:", error);
        Alert.alert("Ошибка", "Не удалось загрузить историю платежей");
      }
    };

    handleGet().catch(()=> Alert.alert("Error"))
  }, [id]);

  const renderItem = ({ item }: { item: PaymentHistory }) => (
    <PaymentItem
      item={{
        id: item.id,
        title: item.title || "Услуга",
        description: item.description || `Врач: ${item.doctor || "Не указан"}`,
        price: item.price || 0,

      }}
    />
  );

  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} />

      <Text style={styles.title}>История платежей {id}</Text>

      <View style={styles.wrapper}>
        {payments.length === 0 ? (
          <Text >Платежи не найдены</Text>
        ) : (
          <FlatList
            data={payments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}

          />
        )}
      </View>
    </View>
  );
};

export default PaymentsHistory;
