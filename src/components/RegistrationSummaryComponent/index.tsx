import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import type { Doctor } from "@/components/UserCatalogDoctorsComponent/types";

type Props = {
  doctor: Doctor;
  selectedDate: string | null;
  selectedTime: string | null;
  onCancel: () => void;
};

const RegistrationSummaryComponent: React.FC<Props> = ({ doctor, selectedDate, selectedTime, onCancel }) => {
  const formattedDate = selectedDate ? new Intl.DateTimeFormat("ru-RU").format(new Date(selectedDate)) : "—";
  const time = selectedTime ?? "—";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Детали записи</Text>
        <View style={styles.row}><Text style={styles.label}>Врач:</Text><Text style={styles.value}>{doctor.name}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Специальность:</Text><Text style={styles.value}>{doctor.spec}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Дата:</Text><Text style={styles.value}>{formattedDate}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Время:</Text><Text style={styles.value}>{time}</Text></View>
      </View>
      <View style={styles.buttonWrapper}>
        <CustomButton text="Отмена" handler={onCancel} fullWidth/>
      </View>
    </View>
  );
};

export default RegistrationSummaryComponent;
