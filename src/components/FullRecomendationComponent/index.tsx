import React from "react";
import { Image, Text, View } from "react-native";

import { styles } from "./styled";

import { getRecommendationImage } from "@/constants/recommendationImages";
import type { RecommendationResponse } from "@/http/types/recommendation";

type Props = {
  recommendation: RecommendationResponse;
};

const FullRecomendationComponent: React.FC<Props> = ({ recommendation }) => {
  const { category, title, date, fullDescription, imagePath } = recommendation;

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>

      <Image
        style={styles.image}
        source={getRecommendationImage(imagePath)}
        resizeMode="cover"
      />

      <Text style={styles.description}>{fullDescription}</Text>
    </View>
  );
};

export default FullRecomendationComponent;
