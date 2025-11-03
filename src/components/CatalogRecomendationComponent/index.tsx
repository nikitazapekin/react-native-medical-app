import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import RecomendationCard from "@/components/shared/RecomendationCard";
import { recommendationCatalog } from "@/constants/recommendationCatalog";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const CatalogRecomendationComponent = () => {
  const navigation = useNavigation<FormNavigationProp>();
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Ваши рекомендации</Text>
      <View style={styles.listWrapper}>
        {recommendationCatalog.map((r) => (
          <TouchableOpacity key={r.id} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.STACK.USER_CATALOG_FULL_RECOMENDATION, { recommendationId: r.id })}>
            <RecomendationCard category={r.category} title={r.title} date={r.date} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CatalogRecomendationComponent;
