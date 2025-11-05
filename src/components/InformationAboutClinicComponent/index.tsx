import React from "react";
import { Image, Text, View } from "react-native";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import type { ClinicItem } from "@/constants/clinicList";

type Props = {
  clinic: ClinicItem;
  childName: string;
  onViewMap: () => void;
};

const InformationAboutClinicComponent: React.FC<Props> = ({ clinic, childName, onViewMap }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Информация о поликлинике</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Название:</Text>
          <Text style={styles.value}>{clinic.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Дата прописки в поликлинику:</Text>
          <Text style={styles.value}>{clinic.registrationDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Пациент:</Text>
          <Text style={styles.value}>{childName}</Text>
        </View>

        <Image source={clinic.imagePath} style={styles.clinicImage} />

        <Text style={styles.address}>Адрес: {clinic.address}</Text>

        <View style={styles.buttonWrapper}>
          <CustomButton text="Посмотреть на карте" handler={onViewMap} fullWidth backgroundColor="#1280B2" />
        </View>
      </View>
    </View>
  );
};

export default InformationAboutClinicComponent;
