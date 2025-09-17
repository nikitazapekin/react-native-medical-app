//import { useState } from "react";
import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import { tabIcons } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const Footer = () => {
  const navigation = useNavigation<FormNavigationProp>();
  //  const [activeTab, setActiveTab] = useState("home");
  const handleNavigate = (route: string, type: string) => {
    const validRoutes = ["HOMEPAGE", "CATALOG", "CHAT", "MED", "TUBE"];

    console.log(type);

    if (validRoutes.includes(route)) {

      navigation.navigate(ROUTES.STACK[route as keyof typeof ROUTES.STACK]);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        {tabIcons.map((item) => (
          <View
            onTouchEnd={() => handleNavigate(item.stack, item.type)}
            key={item.id}
            style={[styles.wrapper, item.type == "home" && styles.activeWrapper]}
          >
            <Image source={item.icon} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Footer;
