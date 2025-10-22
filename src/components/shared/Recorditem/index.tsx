import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Med from "@assets/mockPhotos/Vector.png";

interface Record {
  id: string;
  record: string;
  date: string;
  patient: string;
}

const Records: Record[] = [
  { id: "1", record: "Запись 1", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "2", record: "Запись 2", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "3", record: "Запись 3", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "4", record: "Запись 4", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "5", record: "Запись 5", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "6", record: "Запись 6", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "7", record: "Запись 7", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "8", record: "Запись 8", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "9", record: "Запись 9", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
  { id: "10", record: "Запись 10", date: "10.10.2024", patient: "Пациент Журавлев А.Д." },
];

const TodayDoctorRecords = () => {
  const renderAppointment = ({ item }: { item: Record }) => (
    <View style={styles.appointmentItem}>
      {}
      <Image source={Med} style={styles.icon} resizeMode="contain" />

      {}
      <View style={{ flex: 1 }}>
        <Text style={styles.recordText}>{item.record}</Text>
        <Text style={styles.patientText}>{item.patient}</Text>
      </View>

      {}
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Text style={styles.title}>Записи на сегодня</Text>
      <FlatList
        data={Records}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default TodayDoctorRecords;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6F7FF",
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  appointmentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  recordText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  patientText: {
    fontSize: 15,
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "500",
    marginLeft: 12,
  },
});
