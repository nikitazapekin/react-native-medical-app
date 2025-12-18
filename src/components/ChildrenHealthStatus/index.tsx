import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./styled";

import ChildrenService, { type Child } from "@/http/children";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp, RootStackParamList } from "@/navigation/types";

type ChildrenHealthStatusRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.CHILDREN_HEALTH_STATUS>;

const ChildrenHealthStatusComponent = () => {
  const route = useRoute<ChildrenHealthStatusRouteProp>();
  const navigation = useNavigation<FormNavigationProp>();
  const { childId } = route.params;

  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChildData = async () => {
      try {
        setLoading(true);
        const childData = await ChildrenService.getChildById(childId);

        setChild(childData);
      } catch (error) {
        console.error("Error loading child data:", error);
        Alert.alert("Ошибка", "Не удалось загрузить данные ребенка");
      } finally {
        setLoading(false);
      }
    };

    void loadChildData();
  }, [childId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Не указано";

    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleAppointment = () => {
    // Навигация к записи на прием
    navigation.navigate(ROUTES.STACK.USER_CATALOG_DOCTORS, {});
  };

  if (loading) {
    return (
      <View style={[styles.outerWrapper, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1280b2" />
      </View>
    );
  }

  if (!child) {
    return (
      <View style={[styles.outerWrapper, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Данные ребенка не найдены</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.card}>
        <Text style={styles.name}>{child.name}</Text>

        <Text style={styles.label}>Возраст:</Text>
        <Text style={styles.value}>{child.age} {child.age === 1 ? 'год' : child.age < 5 ? 'года' : 'лет'}</Text>

        <Text style={styles.label}>Пол:</Text>
        <Text style={styles.value}>{child.gender === 'M' || child.gender === 'Мужской' ? 'Мужской' : 'Женский'}</Text>

        <Text style={styles.label}>Дата добавления:</Text>
        <Text style={styles.value}>{formatDate(child.createdAt)}</Text>

        <Text style={styles.label}>Дата прописки в поликлинику:</Text>
        <Text style={styles.value}>{formatDate(child.clinicRegistrationDate)}</Text>

        <Image source={{ uri: child.avatar }} style={styles.imagePlaceholder} />

        <TouchableOpacity style={styles.button} onPress={handleAppointment}>
          <Text style={styles.buttonText}>Записаться на приём</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChildrenHealthStatusComponent;
