import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./styled";

import { DoctortabIcons } from "@/constants";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const FooterDoctor = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const currentRouteName = route.name;

    if (currentRouteName === ROUTES.STACK.DOCTOR_RECORD_DETAIL) {
      const appointmentsTab = DoctortabIcons.find((item) => item.type === "doctorAppointments");

      if (appointmentsTab) {
        setActiveTab(appointmentsTab.type);

        return;
      }
    }

    const activeTabItem = DoctortabIcons.find(
      (item) => ROUTES.STACK[item.stack as keyof typeof ROUTES.STACK] === currentRouteName
    );

    if (activeTabItem) {
      setActiveTab(activeTabItem.type);
    }
  }, [route.name]);

  const handleNavigate = (routeName: string, type: string) => {
    const validRoutes = ["DOCTOR", "DOCTOR_CHAT", "DOCTOR_APPOINTMENTS"];

    if (validRoutes.includes(routeName)) {
      setActiveTab(type);
      const routeKey = routeName as keyof typeof ROUTES.STACK;

      navigation.navigate(ROUTES.STACK[routeKey] as any);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        {DoctortabIcons.map((item) => (
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

export default FooterDoctor;
