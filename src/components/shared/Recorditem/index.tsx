import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Med from "@assets/mockPhotos/Vector.png";
import { useNavigation } from "@react-navigation/native";

import MedicalAppointmentService from "@/http/medicalAppointment";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const TodayDoctorRecords = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [appointments, setAppointments] = useState<MedicalAppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        const data = await MedicalAppointmentService.getDoctorTodayAppointments();

        setAppointments(data);
      } catch (error) {
        console.error("Error loading today appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadAppointments();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleAppointmentPress = (appointment: MedicalAppointmentResponse) => {
    navigation.navigate(ROUTES.STACK.DOCTOR_RECORD_DETAIL, {
      record: {
        id: appointment.id.toString(),
        time: appointment.appointmentTime || "",
        patient: appointment.patientName || "Пациент не указан",
        service: appointment.appointmentType || appointment.service?.title || "Услуга не указана",
      },
    });
  };

  const renderAppointment = ({ item, index }: { item: MedicalAppointmentResponse; index: number }) => (
    <TouchableOpacity
      style={styles.appointmentItem}
      onPress={() => handleAppointmentPress(item)}
    >
      <Image source={Med} style={styles.icon} resizeMode="contain" />

      <View style={{ flex: 1 }}>
        <Text style={styles.recordText}>Запись {index + 1}</Text>
        <Text style={styles.patientText}>
          {item.patientName || "Пациент не указан"}
        </Text>
        <Text style={styles.serviceText}>
          {item.appointmentType || item.service?.title || ""}
        </Text>
      </View>

      <View>
        <Text style={styles.dateText}>{formatDate(item.appointmentDate)}</Text>
        <Text style={styles.timeText}>{item.appointmentTime}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1280b2" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Text style={styles.title}>Записи на сегодня</Text>
      {appointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>На сегодня записей нет</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    marginBottom: 2,
  },
  serviceText: {
    fontSize: 14,
    color: "#555",
  },
  dateText: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "500",
    textAlign: "right",
  },
  timeText: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
    textAlign: "right",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
