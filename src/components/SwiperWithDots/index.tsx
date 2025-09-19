import { useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent} from "react-native";
import { FlatList , Text,View } from "react-native";

import { styles } from "./styled";

interface SwiperItem {
  id: string;
  title: string;
  content: string;
}

const CARD_WIDTH = 356;
const CARD_MARGIN = 16;

const SwiperWithDots = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const swiperData: SwiperItem[] = [
    {
      id: '1',
      title: 'Основная информация',
      content: 'Здесь будет основная информация пользователя'
    },
    {
      id: '2',
      title: 'Достижения',
      content: 'Ваши достижения и награды'
    },
    {
      id: '3',
      title: 'Статистика',
      content: 'Статистика активности'
    }
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const itemWidth = CARD_WIDTH + CARD_MARGIN * 2;
    const index = Math.round(scrollPosition / itemWidth);

    setActiveIndex(index);
  };

  const getItemLayout = (_: unknown, index: number) => ({
    length: CARD_WIDTH + CARD_MARGIN * 2,
    offset: (CARD_WIDTH + CARD_MARGIN * 2) * index,
    index,
  });
  const renderItem = ({ item }: { item: SwiperItem }) => (
    <View style={[styles.slide, { width: CARD_WIDTH }]}>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideContent}>{item.content}</Text>
    </View>
  );

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {swiperData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.swiperContainer}>
      <FlatList
        data={swiperData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
      />
      {renderPagination()}
    </View>

  );
};

export default SwiperWithDots;
