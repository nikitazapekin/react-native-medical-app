import { Image, View } from "react-native";

import { styles } from "./styled";

import { tabIcons } from "@/constants";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        {tabIcons.map((item) => (
          <View key={item.id} style={[styles.wrapper, item.type=="home" &&styles.activeWrapper]}>
            <Image source={item.icon} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Footer;
/* import { Image, View } from "react-native";
import { useState } from "react";
import { styles } from "./styled";
import { tabIcons } from "@/constants";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("home"); // По умолчанию активен home

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        {tabIcons.map((item) => (
          <View 
            key={item.id} 
            style={[
              styles.wrapper,
              activeTab === item.type && styles.activeWrapper // Стили для активной кнопки
            ]}
            onTouchEnd={() => setActiveTab(item.type)} // Обработчик нажатия
          >
            <Image 
              source={item.icon} 
              style={[
                styles.image,
                activeTab === item.type && styles.activeImage // Стили для активной иконки
              ]} 
              resizeMode="contain" 
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Footer;
 */
/* import { Image,  View } from "react-native";

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
 */
