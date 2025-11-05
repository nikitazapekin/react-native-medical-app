import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styled";

type Props = {
  title: string;
  subtitle: string;
};

const ServiceComponent: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  );
};

export default ServiceComponent;
