import React, { useEffect, useMemo } from "react";
import { Animated, Easing, Text, TouchableOpacity, ViewStyle } from "react-native";
import { PRIMARY } from "@/constants/colors";

import { styles } from "./styled";

type Props = {
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  selected?: boolean;
  primaryColor?: string;
};

const TimeSlot: React.FC<Props> = ({ text, onPress, style, selected = false, primaryColor = PRIMARY }) => {
  const bg = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(bg, {
      toValue: selected ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const backgroundColor = bg.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", primaryColor],
  });

  const textColor = bg.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000", "#fff"],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[styles.slot, style, { backgroundColor, borderColor: "#E5E7EB", borderWidth: 1 }]}>
        <Animated.Text style={[styles.slotText, { color: textColor }]}>{text}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TimeSlot;


