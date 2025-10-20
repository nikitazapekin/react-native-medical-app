import { Image,Text, View } from "react-native";
import MockImage from "@assets/profile/doctor.jpg";
import RatingStar from "@assets/profile/star.png";

import { styles } from "./styled";

const DoctorCabinetInfo = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <View style={styles.main}>
          <Image style={styles.image} source={MockImage} alt="Image" resizeMode="contain" />

          <View style={styles.info}>
            <Text style={styles.title}>Андрей Быков</Text>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Рейтинг:</Text>
              <Text style={styles.registrationBold}> 5.00</Text>
              <Image style={styles.icon} source={RatingStar} alt="Image" resizeMode="contain" />
            </View>

            <Text style={styles.location}>Заведующий отделением</Text>

            <Text style={styles.tel}>+375297542229</Text>
          </View>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot}/>
          </View>
        </View>
      </View>
      <Text
        style={styles.citate}
      >Клинические идиоты должны держаться группами! По одному вы пропадете.</Text>

    </View>

  );
};

export default DoctorCabinetInfo;
