import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import DoctorCard from "@/components/shared/DoctorCard";
import ServiceComponent from "@/components/shared/ServiceComponent";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";
import { doctorsCatalog } from "@/constants/doctorsCatalog";
import { servicesCatalog } from "@/constants/servicesCatalog";
import ServiceRecomendationCard from "@/components/shared/ServiceRecomendationCard";
import MedicalServiceImg from "@assets/mockPhotos/IconCatalog.png";

const CatalogComponent = () => {

  const navigation = useNavigation<FormNavigationProp>();

  const handleViewAllDoctors = () => {
    navigation.navigate(ROUTES.STACK.USER_CATALOG_DOCTORS);
  };

  const handleViewAllServices = () => {
    navigation.navigate(ROUTES.STACK.USER_CATALOG_SERVICES);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>Популярные врачи</Text>

      {doctorsCatalog.slice(0, 3).map((d) => (
        <TouchableOpacity key={d.id} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor: d })}>
          <DoctorCard name={d.name} spec={d.spec} availability={d.availability} avatar={d.avatar} />
        </TouchableOpacity>
      ))}

      <View style={styles.primaryButtonWrapper}>
        <CustomButton text="Посмотреть всех популярных врачей" handler={handleViewAllDoctors} backgroundColor={COLORS.PRIMARY} />
      </View>

      <Text style={styles.sectionTitle}>Спектр услуг</Text>

      {servicesCatalog.slice(0, 3).map((s) => (
        <TouchableOpacity key={s.id} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.STACK.USER_CATALOG_DOCTORS, { serviceName: s.title })}>
          <ServiceComponent title={s.title} subtitle={s.subtitle} />
        </TouchableOpacity>
      ))}

      <View style={styles.primaryButtonWrapper}>
        <CustomButton text="Посмотреть все услуги" handler={handleViewAllServices} backgroundColor={COLORS.PRIMARY} />
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
