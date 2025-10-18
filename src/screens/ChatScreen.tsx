import React from 'react';
import {   ScrollView,Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import ChatKeypad from '@/components/ChatKeypad';
 
import Header from '@/components/shared/Header';

export default function ChatScreen( ) {
  return (
    <View style={styles.container}>

      <Header title='Чат' isAuthenticated={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Список чатов</Text>

      </ScrollView>

      <ChatKeypad />

      <StatusBar style="auto" />
    </View>
  );
}
