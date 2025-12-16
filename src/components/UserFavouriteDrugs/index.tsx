import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

import DroppableList from "../shared/DroppableList";
import DrugsItem from "../shared/DrugsItem";

import { styles } from "./styled";

import FavouriteDrugService from "@/http/favouriteDrug";
import type { FavouriteDrug } from "@/http/types/favouriteDrug";

const sortOptions = [
  { id: "1", label: "По названию", type: "name" },
  { id: "2", label: "По Стоимости", type: "cost" },
  { id: "3", label: "По типу", type: "type" },
];

const UserFavouritesDrugs = () => {
  const [drugs, setDrugs] = useState<FavouriteDrug[]>([]);

  const renderItem = ({ item }: { item: FavouriteDrug }) => (
    <DrugsItem
      item={{
        id: item.id,
        title: item.title,
        price: item.price,
        type: item.type || "",
        description: item.description || "",
        dosage: item.dosage || ""
      }}
    />
  );

  useEffect(() => {
    const handleGet = async () => {
      try {
        const resp = await FavouriteDrugService.getMyFavouriteDrugs();

        setDrugs(resp || []);
      } catch {
        Alert.alert("Ошибка", "Не удалось загрузить избранные лекарства");
      }
    };

    handleGet().catch(() => Alert.alert("Error"));
  }, []);

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
