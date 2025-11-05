import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { COLORS } from "appStyles";
import AvatarImg from "@assets/mockPhotos/AvatarDoctorCatalog.png";
import MedicalServiceImg from "@assets/mockPhotos/IconCatalog.png"
import PillIcon from "@assets/tabBar/booking.png";
import CustomButton from "@/components/shared/Button";
import { styles } from "./styled";

const CatalogComponent = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>Популярные врачи</Text>

      <View style={styles.cardShadowWrapper}>
        <View style={styles.doctorCard}>
          <View style={styles.avatarWrapper}>
            <Image source={AvatarImg} style={styles.avatarImage} resizeMode="contain" />
          </View>

          <View style={styles.doctorTextBlock}>
            <Text style={styles.doctorName}>Незнамов Петр Петрович</Text>
            <Text style={styles.doctorSpec}>Стоматолог</Text>

            <View style={styles.availabilityPill}>
              <Image source={PillIcon} style={styles.pillIcon} resizeMode="contain" />
              <Text style={styles.pillText}>Сегодня с 9:00 до 17:00</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardShadowWrapper}>
        <View style={styles.doctorCard}>
          <View style={styles.avatarWrapper}>
            <Image source={AvatarImg} style={styles.avatarImage} resizeMode="contain" />
          </View>

          <View style={styles.doctorTextBlock}>
            <Text style={styles.doctorName}>Незнамов Петр Петрович</Text>
            <Text style={styles.doctorSpec}>Стоматолог</Text>
            <View style={styles.availabilityPill}>
              <Image source={PillIcon} style={styles.pillIcon} resizeMode="contain" />
              <Text style={styles.pillText}>Сегодня с 9:00 до 17:00</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.primaryButtonWrapper}>
        <CustomButton text="Редактировать профиль" handler={() => {}} backgroundColor={COLORS.PRIMARY} />
      </View>

      <Text style={styles.sectionTitle}>Спектр услуг</Text>

      <View style={styles.cardShadowWrapper}>
        <View style={styles.serviceCard}>
          <View style={styles.serviceIconHalo} />
          <Image source={MedicalServiceImg} style={styles.serviceIcon} resizeMode="contain"/>
          <Text style={styles.serviceText}>Стоматология</Text>
        </View>
      </View>

      <View style={styles.cardShadowWrapper}>
        <View style={styles.serviceCard}>
          <View style={styles.serviceIconHalo} />
          <Image source={MedicalServiceImg} style={styles.serviceIcon} resizeMode="contain"/>
          <Text style={styles.serviceText}>Кардиология</Text>
        </View>
      </View>

      <View style={styles.primaryButtonWrapper}>
        <CustomButton text="Посмотреть все услуги" handler={() => {}} backgroundColor={COLORS.PRIMARY} />
      </View>

      <Text style={styles.sectionTitle}>Рекомендации</Text>

      <View style={styles.cardShadowWrapper}>
        <View style={styles.serviceCard}>
          <View style={styles.serviceIconHalo} />
          <Image source={MedicalServiceImg} style={styles.serviceIcon} resizeMode="contain"/>
          <Text style={styles.serviceText}>Физические упражнения</Text>
        </View>
      </View>

      <View style={styles.cardShadowWrapper}>
        <View style={styles.serviceCard}>
          <View style={styles.serviceIconHalo} />
          <Image source={MedicalServiceImg} style={styles.serviceIcon} resizeMode="contain"/>
          <Text style={styles.serviceText}>Подготовка к сезону простуд</Text>
        </View>
      </View>

      <View style={styles.primaryButtonWrapper}>
        <CustomButton text="Посмотреть все рекомендации" handler={() => {}} backgroundColor={COLORS.PRIMARY} />
      </View>
    </View>
  );
}

export default CatalogComponent;