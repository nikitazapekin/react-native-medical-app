import { ScrollView,Text, View } from "react-native";

import { styles } from "./styled";

const Recommendations = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Рекомендация по улучшению рациона</Text>

          <Text style={styles.descriptionText}>
              Рекомендация по рациону питания ребенка может зависеть от возраста, активности и
              особенностей здоровья ребенка. Ниже приведен общий подход к сбалансированному рациону
              питания для детей:
          </Text>

          <View style={styles.recommendation}>
            <Text style={styles.recommendationTitle}>1. Завтрак: энергетический старт дня</Text>
            <View style={styles.recommendationList}>
              <View style={styles.recomendationElement}>
                <View style={styles.bullet} />
                <Text style={styles.recomendationElementText}>
                  Цельнозерновые каши (овсянка, гречка) или мюсли.
                </Text>
              </View>
              <View style={styles.recomendationElement}>
                <View style={styles.bullet} />
                <Text style={styles.recomendationElementText}>
                  Молочные продукты (молоко, йогурт, творог).
                </Text>
              </View>
              <View style={styles.recomendationElement}>
                <View style={styles.bullet} />
                <Text style={styles.recomendationElementText}>
                  Фрукты или ягоды.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.recommendation}>
            <Text style={styles.recommendationTitle}>2. Обед: сбалансированное питание</Text>
            <View style={styles.recommendationList}>
              <View style={styles.recomendationElement}>
                <View style={styles.bullet} />
                <Text style={styles.recomendationElementText}>
                  Овощной суп или бульон.
                </Text>
              </View>
              <View style={styles.recomendationElement}>
                <View style={styles.bullet} />
                <Text style={styles.recomendationElementText}>
                  Мясо, рыба или птица с гарниром.
                </Text>
              </View>
              <View style={styles.recomendationElement}>
                <View style={styles.bullet} />
                <Text style={styles.recomendationElementText}>
                  Свежие овощи.
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.example}>Пример: Ягоды и фрукты</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Recommendations;
