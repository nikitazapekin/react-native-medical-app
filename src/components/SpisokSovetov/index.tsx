import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import SovetiSwiper from "../shared/SovetiSwiper";

import { styles } from "./styled";

import SurveyService from "@/http/survey";
import type { SurveyResponse } from "@/http/types/survey";

const SpisokSovetov = () => {
  const [oprosi, setOprosi] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    const handleGet = async () => {
      try {

        const resp = await SurveyService.getAllSurveys();

        setOprosi(resp);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        Alert.alert("Ошибка", "Не удалось загрузить опросы");
      }
    };

    handleGet().catch(()=> Alert.alert("Error"));
  }, []);

  const groupedSurveys = oprosi.reduce((acc, survey) => {
    if (!acc[survey.category]) {
      acc[survey.category] = [];
    }

    acc[survey.category].push(survey);

    return acc;
  }, {} as Record<string, SurveyResponse[]>);

  if (oprosi.length === 0) {
    return (
      <ScrollView style={styles.wrapper}>
        <View >
          <Text  >Опросы не найдены</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      {Object.entries(groupedSurveys).map(([category, surveys]) => (
        <View key={category} style={styles.swiperItem}>
          <Text style={styles.title}>{category}</Text>
          <SovetiSwiper surveys={surveys} />
        </View>
      ))}
    </ScrollView>
  );
};

export default SpisokSovetov;
/* import { Alert, ScrollView,Text, View } from "react-native";

import SovetiSwiper from "../shared/SovetiSwiper";

import { styles } from "./styled";
import { useEffect, useState } from "react";
import SurveyService from "@/http/survey";
import { SurveyResponse } from "@/http/types/survey";

const SpisokSovetov = () => {

  const [oprosi ,setOprosi] = useState<SurveyResponse[]>()
  useEffect(() => {
    const handleGet = async () => {
      try {
        const resp = await SurveyService.getAllSurveys()
      setOprosi(resp)
      } catch {
        Alert.alert("Error");
      }
    };
    handleGet().catch(()=> Alert.alert("Error"))
  }, []);

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.swiperItem}>
        <Text style={styles.title}>О здоровье</Text>
        <SovetiSwiper />
      </View>

      <View style={styles.swiperItem}>
        <Text style={styles.title}>О здоровье</Text>
        <SovetiSwiper />
      </View>

      <View style={styles.swiperItem}>
        <Text style={styles.title}>О здоровье</Text>
        <SovetiSwiper />
      </View>

    </ScrollView>
  );
};

export default SpisokSovetov;
 */
