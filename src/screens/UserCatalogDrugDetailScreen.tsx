import React, { useState, useEffect } from "react";
import { Alert, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import CustomButton from "@/components/shared/Button";

import FavouriteDrugService from "@/http/favouriteDrug";
import type { FormNavigationProp } from "@/navigation/types";

interface Drugs {
  id: number;
  title: string;
  shortDescription?: string;
  description: string;
  price: number;
  type: string;
  dosage: string;
  imagePath?: string;
}

interface RouteParams {
  drug: Drugs;
  isFavourite?: boolean;
  favouriteId?: number;
}

const getDrugImage = (imagePath: string | null | undefined): ImageSourcePropType => {

  if (!imagePath) {
    return require("@assets/mockPhotos/recommendation2.jpg");
  }

  
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return { uri: imagePath };
  }

  
  return require("@assets/mockPhotos/recommendation2.jpg");
};

const UserCatalogDrugDetail = () => {
  const route = useRoute();
  const navigation = useNavigation<FormNavigationProp>();
  const { drug, isFavourite, favouriteId } = route.params as RouteParams;
  const [isInFavourites, setIsInFavourites] = useState(isFavourite || false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfInFavourites();
  }, []);

  const checkIfInFavourites = async () => {
    try {
      const favourites = await FavouriteDrugService.getMyFavouriteDrugs();
      const found = favourites.some(f => f.drugId === drug.id);
      setIsInFavourites(found);
    } catch (error) {
      console.error("Error checking favourites:", error);
    }
  };

  const handleAddToFavourites = async () => {
    if (isInFavourites) {
      Alert.alert("Информация", "Лекарство уже в избранном");
      return;
    }

    try {
      setLoading(true);
      await FavouriteDrugService.createFavouriteDrug({
        drugId: drug.id,
      });
      setIsInFavourites(true);
      Alert.alert("Успешно", "Лекарство добавлено в избранное");
    } catch (error: any) {
      console.error("Error adding to favourites:", error);
      const message = error?.response?.data?.message || "Не удалось добавить лекарство в избранное";
      Alert.alert("Ошибка", message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromFavourites = async () => {
    if (!favouriteId) {
      Alert.alert("Ошибка", "Не удалось удалить из избранного");
      return;
    }

    Alert.alert(
      "Удаление",
      "Вы уверены, что хотите удалить это лекарство из избранного?",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await FavouriteDrugService.deleteFavouriteDrug(favouriteId);
              setIsInFavourites(false);
              Alert.alert("Успешно", "Лекарство удалено из избранного");
              navigation.goBack();
            } catch (error) {
              console.error("Error removing from favourites:", error);
              Alert.alert("Ошибка", "Не удалось удалить лекарство из избранного");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const imageSource = getDrugImage(drug.imagePath);

  return (
    <View style={styles.wrapper}>
      <Header title="Детали лекарства" isAuthenticated={true} showBackButton={true} />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{drug.title}</Text>

          <View style={styles.imageContainer}>
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Цена:</Text>
              <Text style={styles.value}>{drug.price} ₽</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Тип:</Text>
              <Text style={styles.value}>{drug.type}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Дозировка:</Text>
              <Text style={styles.value}>{drug.dosage}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Описание:</Text>
            <Text style={styles.descriptionText}>{drug.description}</Text>
          </View>

          <View style={styles.buttonContainer}>
            {isFavourite && favouriteId ? (
              <CustomButton
                text="Удалить из избранного"
                handler={handleRemoveFromFavourites}
                backgroundColor="#dc3545"
                disabled={loading}
              />
            ) : (
              <CustomButton
                text={isInFavourites ? "Уже в избранном" : "Добавить в избранное"}
                handler={handleAddToFavourites}
                backgroundColor={isInFavourites ? "#6c757d" : "#1280B2"}
                disabled={loading || isInFavourites}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 95,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "right",
    flex: 1,
    marginLeft: 12,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
    lineHeight: 24,
    textAlign: "left",
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default UserCatalogDrugDetail;
