import React from "react";
import { ScrollView, StyleSheet,Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import FooterDoctor from "@/components/shared/FooterDoctor";
import Header from "@/components/shared/Header";

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
    <View style={styles.container}>
      <Header title="Детали записи" isAuthenticated={true} showBackButton={true} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Информация о приеме</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>ID записи:</Text>
              <Text style={styles.value}>{record.id}</Text>
            </View>

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

      <FooterDoctor />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    marginTop: 70,
  },
  contentContainer: {
    paddingBottom: 100,
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
