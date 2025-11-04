import React from "react";
import type { ImageSourcePropType} from "react-native";
import { Image, Text, View } from "react-native";

import { styles } from "./styled";

type Props = {
  recommendation: {
    id: string;
    category: string;
    title: string;
    date: string;
    fullDescription: string;
    imagePath: ImageSourcePropType;
  };
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
        source={imagePath}
        resizeMode="contain"
      />

      <Text style={styles.description}>{fullDescription}</Text>
    </View>
  );
};

export default FullRecomendationComponent;
