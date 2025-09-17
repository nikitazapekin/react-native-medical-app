import { Image,  View } from "react-native";

import { styles } from "./styled";

import { tabIcons } from "@/constants";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.content}>

        {tabIcons.map((item) => (
          <Image key={item.id} source={item.icon} style={styles.image} resizeMode="contain" />
        ))}

      </View>
    </View>
  );
};

export default Footer;
