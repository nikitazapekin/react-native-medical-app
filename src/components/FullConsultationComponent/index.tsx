import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";

type Props = {
  consultation: MedicalAppointmentResponse;
  onReBook: () => void;
};

const FullConsultationComponent: React.FC<Props> = ({ consultation, onReBook }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const doctorName = consultation.doctor
    ? `${consultation.doctor.lastName} ${consultation.doctor.firstName} ${consultation.doctor.middleName || ''}`.trim()
    : consultation.doctorInitials || "Не указан";

  const displayDate = consultation.completedAt
    ? formatDate(consultation.completedAt)
    : formatDate(consultation.appointmentDate);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Консультация: {consultation.category || "Общая"}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Врач:</Text>
          <Text style={styles.value}>{doctorName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Тема:</Text>
          <Text style={styles.value}>{consultation.title || consultation.appointmentName}</Text>
        </View>
        {consultation.duration && (
          <View style={styles.row}>
            <Text style={styles.label}>Продолжительность:</Text>
            <Text style={styles.value}>{consultation.duration}</Text>
          </View>
        )}
        {consultation.price && (
          <View style={styles.row}>
            <Text style={styles.label}>Стоимость:</Text>
            <Text style={styles.value}>{consultation.price} ₽</Text>
          </View>
        )}
        {consultation.patientName && (
          <View style={styles.row}>
            <Text style={styles.label}>Пациент:</Text>
            <Text style={styles.value}>{consultation.patientName}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Дата:</Text>
          <Text style={styles.value}>{displayDate}</Text>
        </View>
        {consultation.description && (
          <View style={styles.row}>
            <Text style={styles.label}>Описание:</Text>
            <Text style={styles.value}>{consultation.description}</Text>
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <CustomButton text="Записаться повторно" handler={onReBook} fullWidth backgroundColor="#1280B2" />
        </View>
      </View>
    </View>
  );
};

export default FullConsultationComponent;
