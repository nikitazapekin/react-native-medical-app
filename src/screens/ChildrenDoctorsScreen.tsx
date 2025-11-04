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

type ChildrenDoctorsRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.CHILDREN_DOCTORS>;

export default function ChildrenDoctorsScreen() {
  const route = useRoute<ChildrenDoctorsRouteProp>();
  const childId = route.params?.childId;

  return (
    <View style={styles.container}>
      <Header title="Консультировавшие врачи" isAuthenticated={true} showBackButton={true}/>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <UserCatalogDoctorsComponent childId={childId} />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
