import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styled";

import RecomendationCard from "@/components/shared/RecomendationCard";
import { recommendationCatalog } from "@/constants/recommendationCatalog";

const CatalogRecomendationComponent = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Ваши рекомендации</Text>
      <View style={styles.listWrapper}>
        {recommendationCatalog.map((r) => (
          <TouchableOpacity key={r.id} activeOpacity={0.7}>
            <RecomendationCard category={r.category} title={r.title} date={r.date} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CatalogRecomendationComponent;


