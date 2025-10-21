import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";


interface Drugs {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  dosage: string;
}


interface RouteParams {
  drug: Drugs;
}

const UserCatalogDrugDetail = () => {
  const route = useRoute();
  const { drug } = route.params as RouteParams;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Детали лекарства</Text>
        <Text style={styles.subtitle}>ID: {drug.id}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Информация о лекарстве</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Название:</Text>
            <Text style={styles.value}>{drug.title}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Описание:</Text>
            <Text style={styles.value}>{drug.description}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Цена:</Text>
            <Text style={styles.value}>{drug.price} ₽</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Тип:</Text>
            <Text style={styles.value}>{drug.type}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Дозировка:</Text>
            <Text style={styles.value}>{drug.dosage}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.8,
  },
  card: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

export default UserCatalogDrugDetail;
