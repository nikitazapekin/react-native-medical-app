import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DroppableList from "../shared/DroppableList";
import DrugsItem from "../shared/DrugsItem";

import { styles } from "./styled";

import FavouriteDrugService from "@/http/favouriteDrug";
import type { FavouriteDrug } from "@/http/types/favouriteDrug";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = [
  { id: "1", label: "По названию", type: "name" },
  { id: "2", label: "По Стоимости", type: "cost" },
  { id: "3", label: "По типу", type: "type" },
];

const UserFavouritesDrugs = () => {
  const [drugs, setDrugs] = useState<FavouriteDrug[]>([]);
  const navigation = useNavigation<FormNavigationProp>();

  const handleDrugPress = (item: FavouriteDrug) => {
    navigation.navigate(ROUTES.STACK.USER_DRUG_DETAIL_SCREEN, {
      drug: {
        id: item.drugId,
        title: item.title,
        shortDescription: item.shortDescription,
        description: item.description || "",
        price: item.price,
        type: item.type || "",
        dosage: item.dosage || "",
        imagePath: item.imagePath,
      },
      isFavourite: true,
      favouriteId: item.id,
    });
  };

  const renderItem = ({ item }: { item: FavouriteDrug }) => (
    <TouchableOpacity onPress={() => handleDrugPress(item)}>
      <DrugsItem
        item={{
          id: item.drugId,
          title: item.title,
          price: item.price,
          type: item.type || "",
          shortDescription: item.shortDescription,
          description: item.description || "",
          dosage: item.dosage || ""
        }}
      />
    </TouchableOpacity>
  );

  const loadFavouriteDrugs = async () => {
    try {
      const resp = await FavouriteDrugService.getMyFavouriteDrugs();
      setDrugs(resp || []);
    } catch {
      Alert.alert("Ошибка", "Не удалось загрузить избранные лекарства");
    }
  };

  useEffect(() => {
    loadFavouriteDrugs().catch(() => Alert.alert("Error"));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavouriteDrugs();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} />
      <Text style={styles.title}>Ваши лекарства</Text>
      {drugs.length === 0 ? (
        <View>
          <Text>Избранные лекарства не найдены</Text>
        </View>
      ) : (
        <FlatList
          data={drugs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default UserFavouritesDrugs;
