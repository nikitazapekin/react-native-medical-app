import React from "react";
import { Text, View } from "react-native";

import { styles as recStyles } from "@/components/shared/RecomendationCard/styled";

type Props = {
  category: string;
  title: string;
  date: string;
};

const ConsultationCard: React.FC<Props> = ({ category, title, date }) => {
  return (
    <View style={recStyles.card}>
      <View style={recStyles.headerRow}>
        <Text style={recStyles.category}>{category}</Text>
        <Text style={recStyles.date}>{date}</Text>
      </View>
      <Text style={recStyles.title}>{title}</Text>
    </View>
  );
};

export default ConsultationCard;


