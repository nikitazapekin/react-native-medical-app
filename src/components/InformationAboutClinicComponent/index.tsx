import React from "react";
import { Image, Text, View } from "react-native";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import { getClinicImage } from "@/constants/clinicImages";
import type { ClinicResponse } from "@/http/types/clinic";

type Props = {
  clinic: ClinicResponse;
  childName: string;
  onViewMap: () => void;
};

const InformationAboutClinicComponent: React.FC<Props> = ({ clinic, childName, onViewMap }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Информация о поликлинике</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Название:</Text>
          <Text style={styles.value}>{clinic.name}</Text>
        </View>
        {clinic.registrationDate && (
        <View style={styles.row}>
          <Text style={styles.label}>Дата прописки в поликлинику:</Text>
            <Text style={styles.value}>{formatDate(clinic.registrationDate)}</Text>
        </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Пациент:</Text>
          <Text style={styles.value}>{childName}</Text>
        </View>

        <Image source={getClinicImage(clinic.imagePath)} style={styles.clinicImage} />

        <Text style={styles.address}>Адрес: {clinic.address}</Text>

        <View style={styles.buttonWrapper}>
          <CustomButton text="Посмотреть на карте" handler={onViewMap} fullWidth backgroundColor="#1280B2" />
        </View>
      </View>
    </View>
  );
};

export default InformationAboutClinicComponent;
