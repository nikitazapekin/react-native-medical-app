import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styled";

import ConsultationCard from "@/components/ConsultationCard";
import DroppableList from "@/components/shared/DroppableList";
import { optionsConsultation, yearConsultationOptions } from "@/constants/optionsConsultation";
import MedicalAppointmentService from "@/http/medicalAppointment";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const ConsultationHistoryComponent = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("date_desc");
  const [consultations, setConsultations] = useState<MedicalAppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        const patientIdStr = await AsyncStorage.getItem('id');

        if (!patientIdStr) {
          console.error('No patient ID found');

          return;
        }

        const patientId = parseInt(patientIdStr);
        const year = selectedYear !== "all" ? parseInt(selectedYear) : undefined;

        const data = await MedicalAppointmentService.getConsultationHistory(
          patientId,
          year,
          selectedSort
        );

        setConsultations(data);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchConsultations();
  }, [selectedYear, selectedSort]);

  const handleYear = (item: { id: string; label: string; type?: string }) => {
    setSelectedYear(item.type || "all");
  };

  const handleSort = (item: { id: string; label: string; type?: string }) => {
    setSelectedSort(item.type || "date_desc");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.content}>

      <View>
        <DroppableList sortOptions={yearConsultationOptions} handler={handleYear} placeholder="Год" />
        <DroppableList sortOptions={optionsConsultation} handler={handleSort} placeholder="Сортировать" />
      </View>

      <Text style={styles.title}>История консультаций</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : (
        <View style={styles.listWrapper}>
          {consultations.length === 0 ? (
            <Text style={{ fontSize: 16, color: "#6B7280", fontWeight: "600" }}>
              История консультаций пуста
            </Text>
          ) : (
            consultations.map((c) => (
              <TouchableOpacity
                key={c.id}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(ROUTES.STACK.USER_FULL_CONSULTATION, { consultationId: c.id })}
              >
                <ConsultationCard
                  category={c.category || "Консультация"}
                  title={c.title || c.appointmentName}
                  date={c.completedAt ? formatDate(c.completedAt) : formatDate(c.appointmentDate)}
                />
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </View>
  );
};

export default ConsultationHistoryComponent;
