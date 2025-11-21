import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "appStyles";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import FullRecomendationComponent from "@/components/FullRecomendationComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import RecommendationService from "@/http/recommendation";
import type { RecommendationResponse } from "@/http/types/recommendation";
import type { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type FullRecRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_CATALOG_FULL_RECOMENDATION>;

export default function UserCatalogFullRecomendationScreen() {
  const route = useRoute<FullRecRouteProp>();
  const { recommendationId } = route.params;

  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await RecommendationService.getRecommendationById(recommendationId);

        setRecommendation(data);
      } catch (err) {
        console.error("Error fetching recommendation:", err);
        setError("Не удалось загрузить рекомендацию");
      } finally {
        setLoading(false);
      }
    };

    void fetchRecommendation();
  }, [recommendationId]);

  return (
    <View style={styles.container}>
      <Header title="Рекомендация" isAuthenticated={true} showBackButton={true} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        ) : error ? (
          <Text>{error}</Text>
        ) : recommendation ? (
          <FullRecomendationComponent recommendation={recommendation} />
        ) : (
          <Text>Описание рекомендации не загрузилось</Text>
        )}
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
