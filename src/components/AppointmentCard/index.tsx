import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

type Props = {
  category: string;
  title: string;
  date: string;
  doctorInitials?: string;
  appointmentTime?: string;
  patientName?: string;
};

const AppointmentCard: React.FC<Props> = ({ category, title, date, doctorInitials, appointmentTime, patientName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.category} numberOfLines={1}>{category}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>Дата: {date}</Text>
        {appointmentTime && (
          <Text style={styles.date}>Время: {appointmentTime}</Text>
        )}
        {doctorInitials && (
          <Text style={styles.doctor} numberOfLines={1} ellipsizeMode="tail">Врач: {doctorInitials}</Text>
        )}
        {patientName && (
          <Text style={styles.doctor} numberOfLines={1} ellipsizeMode="tail">Пациент: {patientName}</Text>
        )}
      </View>
    </View>
  );
};

export default AppointmentCard;
