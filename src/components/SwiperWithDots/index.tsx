import { useRef, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "@/components/shared/Button";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface SwiperItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
  badge?: string;
  buttonText?: string;
  buttonColor?: string;
}

const CustomSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<FormNavigationProp>();

  const CARD_WIDTH = 356;

  const CARD_MARGIN = (SCREEN_WIDTH - CARD_WIDTH) / 2;

  const swiperData: SwiperItem[] = [
    {
      id: "1",
      title: "Скидка 20%",
      content: "Первый прием у специалиста со скидкой",
      icon: "🎉",
      badge: "АКЦИЯ",
      buttonText: "Записаться",
      buttonColor: "#1280B2",
    },
    {
      id: "2",
      title: "Анализы -30%",
      content: "Комплексное обследование по спеццене",
      icon: "🔬",
      badge: "СКИДКА",
      buttonText: "Подробнее",
      buttonColor: "#1280B2",
    },
    {
      id: "3",
      title: "Новые врачи",
      content: "Врачи высшей категории уже ждут вас",
      icon: "👨‍⚕️",
      badge: "НОВИНКА",
      buttonText: "Посмотреть",
      buttonColor: "#1280B2",
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + CARD_MARGIN * 2));

    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  const getItemLayout = (_: unknown, index: number) => ({
    length: CARD_WIDTH + CARD_MARGIN * 2,
    offset: (CARD_WIDTH + CARD_MARGIN * 2) * index,
    index,
  });

  const handleButtonPress = (item: SwiperItem) => {
    switch (item.id) {
      case "1":

        navigation.navigate(ROUTES.STACK.USER_CATALOG_DOCTORS, {});
        break;

      case "2":

        navigation.navigate(ROUTES.STACK.USER_CATALOG_SERVICES);
        break;

      case "3":

        navigation.navigate(ROUTES.STACK.USER_POPULAR_DOCTORS, { showPopular: true });
        break;

      default:
        break;
    }
  };

  const renderCard = (item: SwiperItem) => (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      {item.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardIcon}>{item.icon}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.content}</Text>
      </View>
      {item.buttonText && (
        <View style={styles.buttonContainer}>
          <CustomButton
            text={item.buttonText}
            handler={() => handleButtonPress(item)}
            backgroundColor={item.buttonColor || "#1280B2"}
            fullWidth
          />
        </View>
      )}
    </View>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      {swiperData.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === activeIndex ? styles.activeDot : styles.inactiveDot]}
          onTouchEnd={() => scrollToIndex(index)}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={swiperData}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: CARD_MARGIN }}>{renderCard(item)}</View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        disableIntervalMomentum={true}
        alwaysBounceHorizontal={false}
      />

      {renderPagination()}

      <View style={styles.positionIndicator}>
        <Text style={styles.positionText}>
          {activeIndex + 1} / {swiperData.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    height: 340,
  },
  flatListContent: {
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    height: 280,
    justifyContent: "space-between",
    position: "relative",
    shadowColor: "#1280B2",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E8F4F8",
  },
  badge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#993B4A",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
  cardIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1A202C",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#1280B2",
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  inactiveDot: {
    backgroundColor: "#CBD5E1",
  },
  positionIndicator: {
    alignItems: "center",
    marginTop: 12,
  },
  positionText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default CustomSwiper;
