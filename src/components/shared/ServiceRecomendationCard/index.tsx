import React from "react";
import { Image, Text, View } from "react-native";

import { styles } from "./styled";
import type { ServiceRecomendationCardProps } from "./types";

const ServiceRecomendationCard: React.FC<ServiceRecomendationCardProps> = ({ title, icon }) => {
  return (
    <View style={styles.cardShadowWrapper}>
      <View style={styles.serviceCard}>
        <View style={styles.serviceIconHalo} />
        <Image source={icon} style={styles.serviceIcon} resizeMode="contain" />
        <Text style={styles.serviceText}>{title}</Text>
      </View>
    </View>
  );
};

export default ServiceRecomendationCard;

