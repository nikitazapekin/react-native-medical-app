import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { styles } from "./styled";

import AdviceService from "@/http/advice";
import type { AdviceResponse } from "@/http/types/survey";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<AdviceResponse | null>(null);

  useEffect(() => {
    const handleGet = async () => {
      try {

        const resp = await AdviceService.getRandomAdvice();

        setRecommendations(resp);
      } catch (error) {
        console.error('Error fetching random advice:', error);
        Alert.alert("Ошибка", "Не удалось загрузить рекомендации");
      }
    };

    handleGet().catch(()=>Alert.alert("Error"));
  }, []);

  const parseAdviceItems = (itemsJson: string) => {
    try {
      return JSON.parse(itemsJson);
    } catch (error) {
      console.error('Error parsing advice items:', error);

      return [];
    }
  };

  if (!recommendations) {
    return (
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.content}>
            <Text >Рекомендации не найдены</Text>
            <Text style={styles.descriptionText}>
              Попробуйте обновить страницу или завершить опрос для получения персональных рекомендаций.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  const adviceItems = parseAdviceItems(recommendations.items);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{recommendations.type}</Text>

          <Text style={styles.descriptionText}>
            {adviceItems.length > 0
              ? "Вот несколько рекомендаций, которые помогут вам достичь лучших результатов:"
              : "На основе ваших ответов мы подготовили следующие рекомендации:"}
          </Text>

          {adviceItems.map((item: any, index: number) => (
            <View key={index} style={styles.recommendation}>
              <Text style={styles.recommendationTitle}>
                {index + 1}. {item.title || `Рекомендация ${index + 1}`}
              </Text>

              {item.description && (
                <Text  >
                  {item.description}
                </Text>
              )}

              <View style={styles.recommendationList}>

                {item.example && (
                  <View style={styles.recomendationElement}>
                    <View style={styles.bullet} />
                    <Text style={styles.recomendationElementText}>
                      Пример: {item.example}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}

          {recommendations.recommendations && recommendations.recommendations.length > 0 && (
            <View style={styles.recommendation}>
              <Text style={styles.recommendationTitle}>Основные рекомендации</Text>
              <View style={styles.recommendationList}>
                {recommendations.recommendations.map((recommendation, index) => (
                  <View key={index} style={styles.recomendationElement}>
                    <View style={styles.bullet} />
                    <Text style={styles.recomendationElementText}>
                      {recommendation}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {adviceItems.length === 0 && (!recommendations.recommendations || recommendations.recommendations.length === 0) && (
            <View style={styles.recommendation}>
              <Text style={styles.recommendationTitle}>Общие рекомендации</Text>
              <Text style={styles.descriptionText}>
                Для получения более точных рекомендаций пройдите соответствующие опросы
                и регулярно обновляйте информацию о ваших целях и прогрессе.
              </Text>
            </View>
          )}

          {adviceItems.length > 0 && (
            <Text style={styles.example}>
              Пример: {adviceItems[0].example || "регулярное применение рекомендаций"}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Recommendations;
