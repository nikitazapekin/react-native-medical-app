import { Image, Text, View } from "react-native";
import MockImage from "@assets/mockPhotos/Avatar.png";

import { styles } from "./styled";

const CabinetInfo = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <View style={styles.main}>
          <Image style={styles.image} source={MockImage} alt="Image" resizeMode="contain" />

          <View style={styles.info}>
            <Text style={styles.title}>Ирина Власова</Text>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Зарегистрирован(а):</Text>
              <Text style={styles.registrationBold}>29 дней</Text>
            </View>

            <Text style={styles.location}>Беларусь, Минск</Text>

            <Text style={styles.tel}>+375297542229</Text>
          </View>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
      <Text style={styles.citate}>
        Считаю, что залог хорошего здоровья - правильный уход и дисциплина
      </Text>
    </View>
  );
};

export default CabinetInfo;
