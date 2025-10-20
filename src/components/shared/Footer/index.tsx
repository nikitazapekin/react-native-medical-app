import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./styled";

import { tabIcons } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const Footer = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const currentRouteName = route.name;

    const activeTabItem = tabIcons.find(
      (item) => ROUTES.STACK[item.stack as keyof typeof ROUTES.STACK] === currentRouteName
    );

    if (activeTabItem) {
      setActiveTab(activeTabItem.type);
    }
  }, [route.name]);

  const handleNavigate = (routeName: string, type: string) => {
    const validRoutes = ["HOMEPAGE", "CATALOG", "CHATS", "MED", "CHAT", "TUBE"];

    if (validRoutes.includes(routeName)) {
      setActiveTab(type);
      navigation.navigate(ROUTES.STACK[routeName as keyof typeof ROUTES.STACK]);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        {tabIcons.map((item) => (
          <View
            onTouchEnd={() => handleNavigate(item.stack, item.type)}
            key={item.id}
            style={[styles.wrapper, item.type === activeTab && styles.activeWrapper]}
          >
            <Image source={item.icon} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Footer;
