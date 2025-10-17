import { useRef,useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent} from "react-native";
import { Dimensions, FlatList,StyleSheet,Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SwiperItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
}

const CustomSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const CARD_WIDTH = 356;

  const CARD_MARGIN = (SCREEN_WIDTH - CARD_WIDTH) / 2;

  const swiperData: SwiperItem[] = [
    {
      id: '1',
      title: 'Основная информация',
      content: 'Здесь будет основная информация пользователя',
      icon: '📋'
    },
    {
      id: '2',
      title: 'Достижения',
      content: 'Ваши достижения и награды',
      icon: '🏆'
    },
    {
      id: '3',
      title: 'Статистика',
      content: 'Статистика активности и прогресс',
      icon: '📊'
    }
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

  const renderCard = (item: SwiperItem) => (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <Text style={styles.cardIcon}>{item.icon}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardContent}>{item.content}</Text>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      {swiperData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
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
          <View style={{ marginHorizontal: CARD_MARGIN }}>
            {renderCard(item)}
          </View>
        )}
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
    height: 220,
  },
  flatListContent: {

    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 14,
    color: 'orange',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'red',
    width: 12,
  },
  inactiveDot: {
    backgroundColor: '#E2E8F0',
  },
  positionIndicator: {
    alignItems: 'center',
    marginTop: 8,
  },
  positionText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
});

export default CustomSwiper;

/* import { useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent} from "react-native";
import { FlatList , Text,View } from "react-native";

import { styles } from "./styled";

import { ChildrenImage } from "@/constants";

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
 */
