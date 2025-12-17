import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import UserFavouritesDrugs from "@/components/UserFavouriteDrugs";

export default function UserFavouritesDrugsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Избранные лекарства" isAuthenticated={true} showBackButton={true} />
      <View style={styles.content}>
        <UserFavouritesDrugs />
      </View>

      <Footer />

    </View>
  );
}
