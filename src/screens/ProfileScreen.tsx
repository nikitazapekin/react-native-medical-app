import React from "react";
import { ScrollView,  Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "./styles";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>

      <Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Личная информация</Text>
        <View style={styles.card}>
          <Text>Имя: Иван Иванов</Text>
          <Text>Email: ivan@example.com</Text>
          <Text>Телефон: +7 (999) 999-99-99</Text>
        </View>

        <Text style={styles.sectionTitle}>Настройки</Text>
        <View style={styles.card}>
          <Text>Уведомления: Включены</Text>
          <Text>Язык: Русский</Text>
          <Text>Тема: Светлая</Text>
        </View>

        <Text style={styles.sectionTitle}>Настройки</Text>
        <View style={styles.card}>
          <Text>Уведомления: Включены</Text>
          <Text>Язык: Русский</Text>
          <Text>Тема: Светлая</Text>
        </View>

        <Text style={styles.sectionTitle}>Настройки</Text>
        <View style={styles.card}>
          <Text>Уведомления: Включены</Text>
          <Text>Язык: Русский</Text>
          <Text>Тема: Светлая</Text>
        </View>

        <Text style={styles.sectionTitle}>Настройки</Text>
        <View style={styles.card}>
          <Text>Уведомления: Включены</Text>
          <Text>Язык: Русский</Text>
          <Text>Тема: Светлая</Text>
        </View>

        <Text style={styles.sectionTitle}>Настройки</Text>
        <View style={styles.card}>
          <Text>Уведомления: Включены</Text>
          <Text>Язык: Русский</Text>
          <Text>Тема: Светлая</Text>
        </View>

        <Text style={styles.sectionTitle}>Дополнительно</Text>
        <View style={styles.card}>
          <Text>Версия приложения: 1.0.0</Text>
          <Text>Дата регистрации: 01.01.2024</Text>
        </View>

        <View style={styles.longContent}>
          <Text>Дополнительный контент 1</Text>
          <Text>Дополнительный контент 2</Text>
          <Text>Дополнительный контент 3</Text>
          <Text>Дополнительный контент 4</Text>
          <Text>Дополнительный контент 5</Text>
        </View>
      </ScrollView>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
