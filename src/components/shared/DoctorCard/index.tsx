import React from "react";
import { Image, Text, View } from "react-native";
import PillIcon from "@assets/tabBar/booking.png";

import { styles } from "./styled";
import type { DoctorCardProps } from "./types";

const DoctorCard: React.FC<DoctorCardProps> = ({ name, spec, availability, avatar }) => {
  return (
    <View style={styles.cardShadowWrapper}>
      <View style={styles.doctorCard}>
        <View style={styles.avatarWrapper}>
          <Image source={avatar} style={styles.avatarImage} resizeMode="contain" />
        </View>

        <View style={styles.doctorTextBlock}>
          <Text style={styles.doctorName}>{name}</Text>
          <Text style={styles.doctorSpec}>{spec}</Text>

          <View style={styles.availabilityPill}>
            <Image source={PillIcon} style={styles.pillIcon} resizeMode="contain" />
            <Text style={styles.pillText}>{availability}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorCard;
