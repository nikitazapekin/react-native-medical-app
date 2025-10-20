import React, { useRef, useState } from "react";
import type { ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Dimensions, FlatList, Image, Text, View } from "react-native";

import { styles } from "./styled";

const { width: screenWidth } = Dimensions.get("window");

interface CardData {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
}

interface SwiperWithDotsProps {
  data?: CardData[];
}

const DoctorSwiper: React.FC<SwiperWithDotsProps> = ({ data = defaultData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);

    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }: { item: CardData }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const renderDot = (index: number) => (
    <View
      key={index}
      style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
      />

      <View style={styles.dotsContainer}>{data.map((_, index) => renderDot(index))}</View>
    </View>
  );
};

const defaultData: CardData[] = [
  {
    id: "1",
    image: require("../../assets/Children.png"),
    title: "Карточка 1",
    description: "Это описание первой карточки с интересным контентом.",
  },
  {
    id: "2",
    image: require("../../assets/Children.png"),
    title: "Карточка 2",
    description: "Вторая карточка с другой информацией и контентом.",
  },
  {
    id: "3",
    image: require("../../assets/Children.png"),
    title: "Карточка 3",
    description: "Третья карточка завершает наш свайпер примеров.",
  },
];

export default DoctorSwiper;
