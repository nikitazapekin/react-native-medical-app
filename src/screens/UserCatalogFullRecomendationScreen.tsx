import React from "react";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";

import { styles } from "./styles";

import FullRecomendationComponent from "@/components/FullRecomendationComponent";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { RouteProp } from "@react-navigation/native";
import { recommendationCatalog } from "@/constants/recommendationCatalog";
import { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type FullRecRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_CATALOG_FULL_RECOMENDATION>;

export default function UserCatalogFullRecomendationScreen() {
  const route = useRoute<FullRecRouteProp>();
  const { recommendationId } = route.params;
  
  const recommendation = recommendationCatalog.find((r) => r.id === recommendationId);

  return (
    <View style={styles.container}>
      <Header title="Рекомендация" isAuthenticated={true} showBackButton={true} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {recommendation ? (
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


