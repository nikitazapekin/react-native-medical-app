import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";

import DroppableList from "../shared/DroppableList";
import DrugsItem from "../shared/DrugsItem";
import SearchInput from "../shared/SearchInput";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";
import DrugService from "@/http/drug";
import type { Drug } from "@/http/types/drug";

const sortOptions = [
  { id: "1", label: "По названию", type: "name" },
  { id: "2", label: "По Стоимости", type: "cost" },
  { id: "3", label: "По типу", type: "type" },
];

const MedScreenDrugs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState<string>("");

  const navigation = useNavigation<FormNavigationProp>();

  const loadDrugs = useCallback(async (search?: string, sortBy?: string) => {
    try {
      setLoading(true);
      const data = await DrugService.getAllDrugs({
        search: search || undefined,
        sortBy: sortBy as 'name' | 'cost' | 'type' | undefined,
      });
      setDrugs(data);
    } catch (error) {
      console.error("Error loading drugs:", error);
      Alert.alert("Ошибка", "Не удалось загрузить список лекарств");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDrugs();
  }, [loadDrugs]);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      loadDrugs(searchTerm || undefined, sortType || undefined);
    }, 300),
    [loadDrugs, sortType]
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSortChange = (selectedOption: { id: string; label: string; type?: string }) => {
    const newSortType = selectedOption.type || "";
    setSortType(newSortType);
    loadDrugs(searchQuery || undefined, newSortType || undefined);
  };

  const handleDrugPress = (item: Drug) => {
    navigation.navigate(ROUTES.STACK.USER_DRUG_DETAIL_SCREEN, {
      drug: {
        id: item.id,
        title: item.title,
        shortDescription: item.shortDescription,
        description: item.description,
        price: item.price,
        type: item.type,
        dosage: item.dosage,
        imagePath: item.imagePath,
      }
    });
  };

  const renderItem = ({ item }: { item: Drug }) => (
    <TouchableOpacity
      onPress={() => handleDrugPress(item)}
      style={{ zIndex: 1 }}
    >
      <DrugsItem
        item={{
          id: item.id,
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

  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} handler={handleSortChange} />
      <SearchInput value={searchQuery} onChangeText={handleSearchChange} />
      <Text style={styles.title}>Список лекарств</Text>

      {loading ? (
        <View style={styles.listWrapper}>
          <Text>Загрузка...</Text>
        </View>
      ) : drugs.length === 0 ? (
        <View style={styles.listWrapper}>
          <Text>Лекарства не найдены</Text>
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

export default MedScreenDrugs;
