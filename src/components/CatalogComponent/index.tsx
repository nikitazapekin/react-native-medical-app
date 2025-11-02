import React from "react";
import { Image, Text, View } from "react-native";
import AvatarImg from "@assets/mockPhotos/AvatarDoctorCatalog.png";
import MedicalServiceImg from "@assets/mockPhotos/IconCatalog.png";
import { COLORS } from "appStyles";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import DoctorCard from "@/components/shared/DoctorCard";
import ServiceRecomendationCard from "@/components/shared/ServiceRecomendationCard";

const CatalogComponent = () => {

  const navigation = useNavigation<FormNavigationProp>();

  const handleViewAllDoctors = () => {
    navigation.navigate(ROUTES.STACK.USER_CATALOG_DOCTORS);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>Популярные врачи</Text>

      <DoctorCard
        name="Незнамов Петр Петрович"
        spec="Стоматолог"
        availability="Сегодня с 9:00 до 17:00"
        avatar={AvatarImg}
      />

      <DoctorCard
        name="Незнамов Петр Петрович"
        spec="Стоматолог"
        availability="Сегодня с 9:00 до 17:00"
        avatar={AvatarImg}
      />

      <View style={styles.primaryButtonWrapper}>
        <CustomButton text="Посмотреть всех популярных врачей" handler={handleViewAllDoctors} backgroundColor={COLORS.PRIMARY} />
      </View>

      <Text style={styles.sectionTitle}>Спектр услуг</Text>

      <ServiceRecomendationCard title="Стоматология" icon={MedicalServiceImg} />

      <ServiceRecomendationCard title="Кардиология" icon={MedicalServiceImg} />

      <View style={styles.primaryButtonWrapper}>
        <CustomButton text="Посмотреть все услуги" handler={() => {}} backgroundColor={COLORS.PRIMARY} />
      </View>

      <Text style={styles.sectionTitle}>Рекомендации</Text>

      <ServiceRecomendationCard title="Физические упражнения" icon={MedicalServiceImg} />

      <ServiceRecomendationCard title="Подготовка к сезону простуд" icon={MedicalServiceImg} />

      <View style={styles.primaryButtonWrapper}>
        <CustomButton text="Посмотреть все рекомендации" handler={() => {}} backgroundColor={COLORS.PRIMARY} />
      </View>
    </View>
  );
};

export default CatalogComponent;
