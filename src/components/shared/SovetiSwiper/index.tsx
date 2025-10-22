
import React from 'react';
import { Image, Pressable,ScrollView,Text, View   } from "react-native";
import MockSwiper from "@assets/mockPhotos/Soveti.png";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

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
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    console.log(1111);
    navigation.navigate(ROUTES.STACK.USER_OPROS);

  };

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
          <Pressable onPress={handleNavigate} key={item.id} style={styles.card}>
            <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <Text style={styles.cardText}>{item.text}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default SovetiSwiper;

/*

import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { ListItemProps } from "./types";

import { profileOptions } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const ListItem = ({ item }: ListItemProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const handleNavigate = () => {
    if (item.text.toLocaleLowerCase().includes("история")) {
      navigation.navigate(ROUTES.STACK.PAYMENTS);
    }

    */
