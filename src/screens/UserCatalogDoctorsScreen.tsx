import React from "react";
import { ScrollView, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import UserCatalogDoctorsComponent from "@/components/UserCatalogDoctorsComponent";
import type { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type DoctorsRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_CATALOG_DOCTORS> |
                        RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_POPULAR_DOCTORS>;

export default function UserCatalogDoctorsScreen() {
  const route = useRoute<DoctorsRouteProp>();
  const serviceName = route.params?.serviceName;
  const serviceId = route.params?.serviceId;
  const showPopular = route.params?.showPopular;

  const title = showPopular ? "Популярные врачи" : serviceName ? "Врачи по услуге" : "Врачи";

  return (
    <View style={styles.container}>
      <Header title={title} isAuthenticated={true} showBackButton={true}/>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} nestedScrollEnabled={true}>
        <UserCatalogDoctorsComponent serviceName={serviceName} serviceId={serviceId} showPopular={showPopular} />
      </ScrollView>

      <Footer />

    </View>
  );
}
