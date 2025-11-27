import React from "react";
import { Image, Text, View } from "react-native";
import RatingStar from "@assets/profile/star.png";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import { getDoctorAvatar } from "@/constants/doctorImages";
import type { DoctorResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

interface AboutDoctorComponentProps {
  doctor: DoctorResponse | any;
}

type AboutRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_ABOUT_DOCTOR>;

const AboutDoctorComponent: React.FC<AboutDoctorComponentProps> = ({ doctor }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<AboutRouteProp>();
  const serviceName = route.params?.serviceName;
  const serviceId = route.params?.serviceId;

  const handleAppointment = () => {
    navigation.navigate(ROUTES.STACK.USER_REGISTRATION_AT_CLINIC, { doctor, serviceName, serviceId });
  };

  const fullName = doctor.firstName
    ? `${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim()
    : doctor.name;

  const rating = doctor.rate || doctor.rating || 0;
  const spec = doctor.specialization || doctor.spec;
  const exp = doctor.experience || "Не указан";
  const edu = doctor.education;
  const achievements = doctor.achievements || [];
  const qualification = doctor.incrementQualification || doctor.qualificationImprovement;

  return (
    <View style={styles.container}>
      <View style={styles.descriptionCard}>
        <View style={styles.cardContent}>
          <View style={styles.mainContent}>
            <Image
              source={getDoctorAvatar(doctor.avatar)}
              style={styles.doctorAvatar}
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{fullName}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Рейтинг:</Text>
                <Text style={styles.ratingValue}>{rating.toFixed(2)}</Text>
                <Image source={RatingStar} style={styles.starIcon} resizeMode="contain" />
              </View>
              <Text style={styles.doctorPosition}>{spec}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.doctorDescription}>
          {doctor.citate || "Высококвалифицированный специалист с многолетним опытом работы в области медицины. Профессионал своего дела, заслуживший признание пациентов и коллег."}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Информация о враче</Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>Опыт работы: </Text>
          {typeof exp === 'number' ? `${exp} лет` : exp}
        </Text>
        {edu && (
          <Text style={styles.infoItem}>
            <Text style={styles.infoLabel}>Образование: </Text>
            {Array.isArray(edu) ? edu.join(". ") : edu}
          </Text>
        )}
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>Специализация: </Text>
          {spec}
        </Text>
        {achievements && achievements.length > 0 && (
          <Text style={styles.infoItem}>
            <Text style={styles.infoLabel}>Достижения: </Text>
            {Array.isArray(achievements) ? achievements.join(". ") : achievements}
          </Text>
        )}
        {qualification && (
          <Text style={styles.infoItem}>
            <Text style={styles.infoLabel}>Повышение квалификации: </Text>
            {Array.isArray(qualification) ? qualification.join(". ") : qualification}
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <CustomButton
            text="Записаться на консультацию"
            handler={handleAppointment}
            backgroundColor="#1280b2"
          />
        </View>
      </View>

    </View>
  );
};

export default AboutDoctorComponent;
