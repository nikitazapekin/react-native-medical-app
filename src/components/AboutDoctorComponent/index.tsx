import React from "react";
import { Image, Text, View } from "react-native";
import RatingStar from "@assets/profile/star.png";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";
import type { Doctor } from "@/components/UserCatalogDoctorsComponent/types";

interface AboutDoctorComponentProps {
  doctor: Doctor;
}

const AboutDoctorComponent: React.FC<AboutDoctorComponentProps> = ({ doctor }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleAppointment = () => {
    navigation.navigate(ROUTES.STACK.USER_REGISTRATION_AT_CLINIC, { doctor });
  };

  return (
    <View style={styles.container}>
      <View style={styles.descriptionCard}>
        <View style={styles.cardContent}>
          <View style={styles.mainContent}>
            <Image source={doctor.avatar} style={styles.doctorAvatar} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Рейтинг:</Text>
                <Text style={styles.ratingValue}>{doctor.rating.toFixed(2)}</Text>
                <Image source={RatingStar} style={styles.starIcon} resizeMode="contain" />
              </View>
              <Text style={styles.doctorPosition}>{doctor.spec}</Text>
            </View>
          </View>
          <View style={styles.threeDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
        <Text style={styles.doctorDescription}>
          Высококвалифицированный специалист с многолетним опытом работы в области медицины.
          Профессионал своего дела, заслуживший признание пациентов и коллег.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Информация о враче</Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>Опыт работы: </Text>
          {doctor.experience}
        </Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>Образование: </Text>
          {doctor.education}
        </Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>Специализация: </Text>
          {doctor.specialization}
        </Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>Достижения: </Text>
          {doctor.achievements.join(". ")}
        </Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>Повышение квалификации: </Text>
          {doctor.qualificationImprovement.join(". ")}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          text="Записаться на консультацию"
          handler={handleAppointment}
          backgroundColor="#1280b2"
        />
      </View>
    </View>
  );
};

export default AboutDoctorComponent;
