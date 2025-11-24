import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import DoctorCard from "@/components/shared/DoctorCard";
import RecomendationCard from "@/components/shared/RecomendationCard";
import ServiceComponent from "@/components/shared/ServiceComponent";
import { getDoctorAvatar } from "@/constants/doctorImages";
import { servicesCatalog } from "@/constants/servicesCatalog";
import DoctorService from "@/http/doctor";
import RecommendationService from "@/http/recommendation";
import type { DoctorResponse } from "@/http/types/doctor";
import type { RecommendationResponse } from "@/http/types/recommendation";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const CatalogComponent = () => {

  const navigation = useNavigation<FormNavigationProp>();
  const [recommendations, setRecommendations] = useState<RecommendationResponse[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [popularDoctors, setPopularDoctors] = useState<DoctorResponse[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoadingRecommendations(true);
        const data = await RecommendationService.getTop3Recommendations();

        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    void fetchRecommendations();
  }, []);

  useEffect(() => {
    const fetchPopularDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const data = await DoctorService.getTop3PopularDoctors();

        setPopularDoctors(data);
      } catch (error) {
        console.error("Error fetching popular doctors:", error);
      } finally {
        setLoadingDoctors(false);
      }
    };

    void fetchPopularDoctors();
  }, []);

  const handleViewAllPopularDoctors = () => {
    navigation.navigate(ROUTES.STACK.USER_POPULAR_DOCTORS, { showPopular: true });
  };

  const handleViewAllServices = () => {
    navigation.navigate(ROUTES.STACK.USER_CATALOG_SERVICES);
  };

  const handleViewAllRecommendations = () => {
    navigation.navigate(ROUTES.STACK.USER_CATALOG_RECOMMENDATIONS);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>Популярные врачи</Text>

      {loadingDoctors ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : popularDoctors && popularDoctors.length > 0 ? (
        <>
          {popularDoctors.map((doctor) => (
            <TouchableOpacity 
              key={doctor.id} 
              activeOpacity={0.7} 
              onPress={() => navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor })}
            >
              <DoctorCard 
                name={`${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim()} 
                spec={doctor.specialization} 
                availability={doctor.status} 
                avatar={getDoctorAvatar(doctor.avatar)} 
              />
            </TouchableOpacity>
          ))}

          <View style={styles.primaryButtonWrapper}>
            <CustomButton text="Посмотреть всех популярных врачей" handler={handleViewAllPopularDoctors} backgroundColor={COLORS.PRIMARY} />
          </View>
        </>
      ) : (
        <Text>Популярные врачи не найдены</Text>
      )}

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

      {loadingRecommendations ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : recommendations && recommendations.length > 0 ? (
        <>
          {recommendations.map((r) => (
            <TouchableOpacity key={r.id} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.STACK.USER_CATALOG_FULL_RECOMENDATION, { recommendationId: r.id })}>
              <RecomendationCard category={r.category} title={r.title} date={r.date} />
            </TouchableOpacity>
          ))}

          <View style={styles.primaryButtonWrapper}>
            <CustomButton text="Посмотреть все рекомендации" handler={handleViewAllRecommendations} backgroundColor={COLORS.PRIMARY} />
          </View>
        </>
      ) : (
        <Text>Рекомендации не найдены</Text>
      )}
    </View>
  );
};

export default CatalogComponent;
