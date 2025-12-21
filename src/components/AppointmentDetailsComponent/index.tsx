import React from "react";
import { Text, View } from "react-native";
import { COLORS } from "appStyles";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";

type Props = {
  consultation: MedicalAppointmentResponse;
  onReBook: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
};

const AppointmentDetailsComponent: React.FC<Props> = ({ consultation, onReBook, onCancel, onReschedule }) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "Запланирована";

      case "COMPLETED":
        return "Завершена";

      case "CANCELLED":
        return "Отменена";

      case "PENDING":
        return "Ожидает подтверждения";

      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return COLORS.SCHEDULED;

      case "COMPLETED":
        return COLORS.SUCCESS;

      case "CANCELLED":
        return COLORS.SECONDARY;

      case "PENDING":
        return COLORS.WARNING;

      default:
        return COLORS.GRAY_DARK;
    }
  };

  const isActiveAppointment = consultation.status === "SCHEDULED" || consultation.status === "PENDING";
  const isCompletedOrCancelled = consultation.status === "COMPLETED" || consultation.status === "CANCELLED";

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
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(consultation.status || "SCHEDULED") }]}>
          <Text style={styles.statusText}>{getStatusText(consultation.status || "SCHEDULED")}</Text>
        </View>

        <Text style={styles.title}>Запись: {consultation.service?.title || consultation.category || "Общая"}</Text>
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
        {consultation.appointmentTime && (
          <View style={styles.row}>
            <Text style={styles.label}>Время:</Text>
            <Text style={styles.value}>{consultation.appointmentTime}</Text>
          </View>
        )}
        {consultation.description && (
          <View style={styles.row}>
            <Text style={styles.label}>Описание:</Text>
            <Text style={styles.value}>{consultation.description}</Text>
          </View>
        )}
        <View style={styles.buttonWrapper}>
          {isActiveAppointment && (
            <>
              {onReschedule && (
                <CustomButton
                  text="Перенести запись"
                  handler={onReschedule}
                  fullWidth
                  backgroundColor={COLORS.PRIMARY}
                />
              )}
              {onCancel && (
                <CustomButton
                  text="Отменить"
                  handler={onCancel}
                  fullWidth
                />
              )}
            </>
          )}

          {isCompletedOrCancelled && (
            <CustomButton
              text="Записаться повторно"
              handler={onReBook}
              fullWidth
              backgroundColor={COLORS.PRIMARY}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default AppointmentDetailsComponent;
