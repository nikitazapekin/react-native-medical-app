import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

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
    <View style={styles.wrapper}>
      <Header title="Детали лекарства" isAuthenticated={true} showBackButton={true} />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingTop: 60,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 95,
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
    alignItems: "flex-start",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginRight: 12,
    flexShrink: 0,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
    textAlign: "right",
    flexWrap: "wrap",
  },
});

export default UserCatalogDrugDetail;
