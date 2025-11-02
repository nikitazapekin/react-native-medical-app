import React from "react";
import { ScrollView, StyleSheet,Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

interface Record {
  id: string;
  time: string;
  patient: string;
  service: string;
} 

interface RouteParams {
  record: Record;
}

const RecordDetailScreen = () => {
  const route = useRoute();
  const { record } = route.params as RouteParams;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Детали записи</Text>
        <Text style={styles.subtitle}>ID: {record.id}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Информация о приеме</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Пациент:</Text>
            <Text style={styles.value}>{record.patient}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Время приема:</Text>
            <Text style={styles.value}>{record.time}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Тип услуги:</Text>
            <Text style={styles.value}>{record.service}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Статус:</Text>
            <Text style={[styles.value, styles.statusConfirmed]}>Подтвержден</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Дополнительная информация</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Продолжительность:</Text>
            <Text style={styles.value}>30 минут</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Кабинет:</Text>
            <Text style={styles.value}>№ 214</Text>
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
  statusConfirmed: {
    color: "#34C759",
    fontWeight: "bold",
  },
});

export default RecordDetailScreen;
