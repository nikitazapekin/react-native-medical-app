import React from 'react';
import {   ScrollView,  View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import ChildrensList from '@/components/ChildrensList';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function ChildrensScreen( ) {
  return (
    <View style={styles.container}>

      <Header title={"Список детей"} isAuthenticated={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <ChildrensList />
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
