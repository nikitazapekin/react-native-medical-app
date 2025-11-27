import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import type { RouteProp} from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styles";

import AboutDoctorComponent from "@/components/AboutDoctorComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import DoctorService from "@/http/doctor";
import type { DoctorResponse } from "@/http/types/doctor";
import type { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type UserAboutDoctorRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_ABOUT_DOCTOR>;

export default function UserAboutDoctorScreen() {
  const route = useRoute<UserAboutDoctorRouteProp>();
  const { doctor: doctorFromParams } = route.params;

  const [doctor, setDoctor] = useState<DoctorResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(null);

        if (doctorFromParams && typeof doctorFromParams === 'object' && 'id' in doctorFromParams) {
          if ('email' in doctorFromParams && 'firstName' in doctorFromParams) {
            setDoctor(doctorFromParams as unknown as DoctorResponse);
          } else {
            const data = await DoctorService.getDoctorById((doctorFromParams as any).id);

            setDoctor(data);
          }
        }
      } catch (err) {
        console.error("Error fetching doctor:", err);
        setError("Не удалось загрузить информацию о враче");
      } finally {
        setLoading(false);
      }
    };

    void fetchDoctor();
  }, [doctorFromParams]);

  return (
    <View style={styles.container}>
      <Header title="О враче" isAuthenticated={true} showBackButton={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        ) : error ? (
          <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
        ) : doctor ? (
          <AboutDoctorComponent doctor={doctor} />
        ) : (
          <Text>Врач не найден</Text>
        )}
      </ScrollView>
      <Footer />    
    </View>
  );
}
