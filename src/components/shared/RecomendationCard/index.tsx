import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styled";

type Props = {
  category: string;
  title: string;
  date: string;
};

const RecomendationCard: React.FC<Props> = ({ category, title, date }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default RecomendationCard;
