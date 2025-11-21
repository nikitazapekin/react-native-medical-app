import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styled";

import RecomendationCard from "@/components/shared/RecomendationCard";
import RecommendationService from "@/http/recommendation";
import type { RecommendationResponse } from "@/http/types/recommendation";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const CatalogRecomendationComponent = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [recommendations, setRecommendations] = useState<RecommendationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await RecommendationService.getAllRecommendations();

        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchRecommendations();
  }, []);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Ваши рекомендации</Text>
      <View style={styles.listWrapper}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        ) : recommendations && recommendations.length > 0 ? (
          recommendations.map((r) => (
            <TouchableOpacity key={r.id} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.STACK.USER_CATALOG_FULL_RECOMENDATION, { recommendationId: r.id })}>
              <RecomendationCard category={r.category} title={r.title} date={r.date} />
            </TouchableOpacity>
          ))
        ) : (
          <Text>Рекомендации не найдены</Text>
        )}
      </View>
    </View>
  );
};

export default CatalogRecomendationComponent;
