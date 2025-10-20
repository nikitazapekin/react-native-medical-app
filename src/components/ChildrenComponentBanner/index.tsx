import { Image, Text,View } from "react-native";
import Children from "@assets/mockPhotos/ChildrenBig.png";

import { styles } from "./styled";

const ChildrenComponentBanner = () => {
  return (

    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <View style={styles.main}>
          <Image style={styles.image} source={Children} alt="Image" resizeMode="contain" />

          <View style={styles.info}>
            <Text style={styles.title}>Никита</Text>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Возраст:</Text>
              <Text style={styles.registrationBold}> 2 года</Text>
            </View>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Пол:</Text>
              <Text style={styles.registrationBold}> мужской</Text>
            </View>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>ID:</Text>
              <Text style={styles.registrationBold}> 124213213</Text>
            </View>

            {/*    <Text style={styles.location}>Беларусь, Минск</Text>

              <Text style={styles.tel}>+375297542229</Text> */}
          </View>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </View>

  );
};

export default ChildrenComponentBanner;
