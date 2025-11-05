import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import type { SurveyResponse } from "@/http/types/survey";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface SovetiSwiperProps {
  surveys?: SurveyResponse[];
}

const CARD_WIDTH = 162;
const CARD_MARGIN = 9;

const DefaultSurveyImage = require("@assets/mockPhotos/Soveti.png");

const SovetiSwiper: React.FC<SovetiSwiperProps> = ({ surveys = [] }) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = (surveyId: number) => {
    navigation.navigate(ROUTES.STACK.USER_OPROS, { id: surveyId });
  };

  if (!surveys || surveys.length === 0) {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + CARD_MARGIN}
          snapToAlignment="start"
          contentContainerStyle={styles.scrollContent}
        >
          <View>
            <Text>Нет доступных опросов</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContent}
      >
        {surveys.map((survey) => (
          <Pressable key={survey.id} style={styles.card} onPress={() => handleNavigate(survey.id)}>
            <Image
              source={survey.image ? { uri: survey.image } : DefaultSurveyImage}
              style={styles.cardImage}
              resizeMode="cover"
              defaultSource={DefaultSurveyImage}
            />
            <Text style={styles.cardText} numberOfLines={2}>
              {survey.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default SovetiSwiper;
