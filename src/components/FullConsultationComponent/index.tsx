import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import type { Doctor } from "@/components/UserCatalogDoctorsComponent/types";
import type { ConsultationItem } from "@/constants/historyConsultation";

type Props = {
  consultation: ConsultationItem;
  doctor: Doctor;
  onReBook: () => void;
};

const FullConsultationComponent: React.FC<Props> = ({ consultation, doctor, onReBook }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Консультация: {consultation.category}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Врач:</Text>
          <Text style={styles.value}>{doctor.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Тема:</Text>
          <Text style={styles.value}>{consultation.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Продолжительность:</Text>
          <Text style={styles.value}>{consultation.duration}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Стоимость:</Text>
          <Text style={styles.value}>{consultation.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Пациент:</Text>
          <Text style={styles.value}>{consultation.patientName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Дата:</Text>
          <Text style={styles.value}>{consultation.date}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton text="Записаться повторно" handler={onReBook} fullWidth backgroundColor="#1280B2" />
        </View>
      </View>
    </View>
  );
};

export default FullConsultationComponent;
