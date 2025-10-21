 
import React from 'react';
import { View, Text, Image, ScrollView,  } from "react-native";
import { styles } from "./styled";
import MockSwiper from "@assets/mockPhotos/Soveti.png"
 
const cardData = [
  {
    id: 1,
    image:MockSwiper, 
    text: "Совет 1"
  },
  {
    id: 2,
    image:MockSwiper,
    text: "Совет 2"
  },
  {
    id: 3,
    image: MockSwiper,
    text: "Совет 3"
  },
  {
    id: 4,
    image: MockSwiper,
    text: "Совет 4"
  },
  {
    id: 5,
    image:MockSwiper,
    text: "Совет 5"
  },
];

const CARD_WIDTH = 162;
//const CARD_HEIGHT = 201;
const CARD_MARGIN = 9;

const SovetiSwiper = () => {
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
        {cardData.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image 
              source={item.image} 
              style={styles.cardImage}
              resizeMode="cover"
            />
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default SovetiSwiper;
/* import { View } from "react-native";

const SovetiSwiper = () => {
  return ( 
  <View>

  </View> );
}
 
export default SovetiSwiper;
 */
