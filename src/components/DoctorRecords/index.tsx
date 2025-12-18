import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View} from "react-native";
import Med from "@assets/mockPhotos/Vector.png";
import { useNavigation } from "@react-navigation/native";
import MedicalAppointmentService from "@/http/medicalAppointment";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface Record {
  id: string;
  time: string;
  patient: string;
  service: string;
}

interface Section {
  title: string;
  date: Date; // Для сортировки
  data: Record[];
}

const TodayDoctorRecords = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        const appointments = await MedicalAppointmentService.getDoctorAllAppointments();
        
        // Получаем сегодняшнюю дату (без времени)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Фильтруем только записи со статусом SCHEDULED и датой >= сегодня
        const scheduledAppointments = appointments.filter((appointment) => {
          if (appointment.status !== 'SCHEDULED') {
            return false;
          }
          
          const appointmentDate = new Date(appointment.appointmentDate);
          appointmentDate.setHours(0, 0, 0, 0);
          
          return appointmentDate >= today;
        });
        
        // Сначала сортируем все записи по дате
        const sortedAppointments = scheduledAppointments.sort((a, b) => {
          const dateA = new Date(a.appointmentDate).getTime();
          const dateB = new Date(b.appointmentDate).getTime();
          return dateA - dateB; // По возрастанию
        });
        
        // Группируем записи по дням с сохранением даты для сортировки
        const groupedByDate: { [key: string]: { date: Date; appointments: MedicalAppointmentResponse[] } } = {};
        
        sortedAppointments.forEach((appointment) => {
          const date = new Date(appointment.appointmentDate);
          const dateKey = date.toLocaleDateString("ru-RU", {
            weekday: "long",
            day: "numeric",
            month: "long",
          });
          
          if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = {
              date: new Date(date.getFullYear(), date.getMonth(), date.getDate()), // Сохраняем дату для сортировки
              appointments: []
            };
          }
          groupedByDate[dateKey].appointments.push(appointment);
        });
        
        // Преобразуем в секции (уже отсортированные, т.к. исходный массив был отсортирован)
        const newSections: Section[] = Object.keys(groupedByDate).map((dateKey) => ({
          title: dateKey.charAt(0).toUpperCase() + dateKey.slice(1),
          date: groupedByDate[dateKey].date, // Для сортировки
          data: groupedByDate[dateKey].appointments.map((appointment) => ({
            id: appointment.id.toString(),
            time: appointment.appointmentTime || "",
            patient: appointment.patientName || "Пациент не указан",
            service: appointment.appointmentType || appointment.service?.title || "Услуга не указана",
          })),
        }));
        
        setSections(newSections);
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const handleRecordPress = (item: Record) => {
    navigation.navigate(ROUTES.STACK.DOCTOR_RECORD_DETAIL , {
      record: item
    });
  };

  const renderItem = ({ item }: { item: Record }) => (

    <TouchableOpacity
      onPress={() => handleRecordPress(item)}
      style={[styles.appointmentItem, { zIndex: 1 }]}
    >
      <Image source={Med} style={styles.icon} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text style={styles.timeText}>Время: {item.time}</Text>
        <Text style={styles.patientText}>ФИО: {item.patient}</Text>
        <Text style={styles.serviceText}>Тип услуги: {item.service}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1280b2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sections.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Записей не найдено</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
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
    flex: 1,
    backgroundColor: "#E6F7FF",
    paddingHorizontal: 16,
  },
  sectionHeader: {
    backgroundColor: "#B2F0B2",
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionHeaderText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  headerLabel: {
    fontWeight: "500",
    color: "#000",
  },
  appointmentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
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
    marginTop: 4,
  },
  timeText: {
    fontWeight: "500",
    marginBottom: 2,
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
