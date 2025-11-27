import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

type Props = {
  category: string;
  title: string;
  date: string;
  doctorInitials?: string;
};

const AppointmentCard: React.FC<Props> = ({ category, title, date, doctorInitials }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.category} numberOfLines={1}>{category}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>Дата: {date}</Text>
        {doctorInitials && (
          <Text style={styles.doctor} numberOfLines={1} ellipsizeMode="tail">Врач: {doctorInitials}</Text>
        )}
      </View>
    </View>
  );
};

export default AppointmentCard;
