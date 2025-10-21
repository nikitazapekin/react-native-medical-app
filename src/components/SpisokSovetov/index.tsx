import { Text, View, ScrollView } from "react-native";

import SovetiSwiper from "../shared/SovetiSwiper";

import { styles } from "./styled";

const SpisokSovetov = () => {
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
/* import { Text, View } from "react-native";

import SovetiSwiper from "../shared/SovetiSwiper";

import { styles } from "./styled";

const SpisokSovetov = () => {
  return (
    <View style={styles.wrapper}>
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

    </View>
  );
};

export default SpisokSovetov;
 */
