import { useEffect, useState } from "react";
import { Alert, FlatList, Text,View } from "react-native";

import DroppableList from "../shared/DroppableList";
import ElementBolezni from "../shared/ElementBolezni";

import { styles } from "./styled";
import type { IstoriaBolezneiProps } from "./types";

import DiseaseHistoryService from "@/http/diseaseHistory";
import type { DiseaseHistory } from "@/http/types/medical";

const sortOptions = [
  { id: "1", label: "Грипп", type: "Gripp" },
  { id: "2", label: "Головная боль", type: "Golovnaya" },
  { id: "3", label: "Боль в животе", type: "Jivot" },
];

const sortOptions1 = [
  { id: "1", label: "По дате", type: "Data" },
  { id: "2", label: "По алфавиту", type: "Alphabite" },
];

function formatDate(isoDateString: string): string {
  return isoDateString.split('T')[0];
}

const IstoriaBoleznei = ({ id }: IstoriaBolezneiProps) => {
  const [bolezni, setBolezni] = useState<DiseaseHistory[]>([]);

  useEffect(() => {
    const handleGet = async () => {
      try {

        const resp = await DiseaseHistoryService.getDiseaseHistories(Number(id));

        setBolezni(resp || []);
      } catch (error) {
        console.error("Error fetching disease histories:", error);
        Alert.alert("Ошибка", "Не удалось загрузить историю болезней");
      }
    };

    handleGet().catch(()=> Alert.alert("Error"));
  }, [id]);

  const renderItem = ({ item }: { item: DiseaseHistory }) => (
    <ElementBolezni
      item={{
        id: item.id,
        name: item.diseaseName || "Болезнь",
        description: item.description || "Описание отсутствует",
        date: item.startDate ? formatDate(item.startDate) : "Дата не указана"
      }}
    />
  );

  return (
    <View style={styles.wrapper}>
      <DroppableList sortOptions={sortOptions} />
      <DroppableList sortOptions={sortOptions1} />

      {bolezni.length === 0 ? (
        <View  >
          <Text>История болезней не найдена</Text>
        </View>
      ) : (
        <FlatList
          data={bolezni}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default IstoriaBoleznei;
