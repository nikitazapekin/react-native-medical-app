import { useEffect, useState } from "react";
import { Alert, FlatList, Text,View} from "react-native";

import DroppableList from "../shared/DroppableList";
import ElementBolezni from "../shared/ElementBolezni";

import { styles } from "./styled";
import type { IstoriaPriemovProps } from "./types";

import MedicalTestService from "@/http/medicalTest";
import type { MedicalTest } from "@/http/types/medical";

const sortOptions = [
  { id: "1", label: "Грипп", type: "Gripp" },
  { id: "2", label: "Головная боль", type: "Golovnaya" },
  { id: "3", label: "Боль в животе", type: "Jivot" },
];

const sortOptions1 = [
  { id: "1", label: "По дате", type: "Data" },
  { id: "2", label: "По алфавиту", type: "Alphabite" },
];

// Функция для форматирования даты
function formatDate(isoDateString: string): string {
  return isoDateString.split('T')[0];
}

const IstoriaPriemov = ({ id }: IstoriaPriemovProps) => {
  const [priemi, setPriemi] = useState<MedicalTest[]>([]);

  const renderItem = ({ item }: { item: MedicalTest }) => (
    <ElementBolezni
      item={{
        id: item.id,
        name: item.testName || "Прием",
        description: item.description || "Медицинский прием",
        date: item.testDate ? formatDate(item.testDate) : "Дата не указана"
      }}
    />
  );

  useEffect(() => {
    const handleGet = async () => {
      try {

        const resp = await MedicalTestService.getMedicalTests(Number(id));

        setPriemi(resp || []);
      } catch   {

        Alert.alert("Ошибка", "Не удалось загрузить данные приемов");
      }
    };

    handleGet().catch(()=> Alert.alert("Error"));
  }, [id]);

  return (
    <View style={styles.wrapper}>
      <DroppableList sortOptions={sortOptions} />
      <DroppableList sortOptions={sortOptions1} />

      {priemi.length === 0 ? (
        <View  >
          <Text>Приемы не найдены</Text>
        </View>
      ) : (
        <FlatList
          data={priemi}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default IstoriaPriemov;

/* import { Alert, FlatList, View } from "react-native";

import DroppableList from "../shared/DroppableList";
import ElementBolezni from "../shared/ElementBolezni";

import { styles } from "./styled";
import { IstoriaPriemovProps } from "./types";
import { useEffect, useState } from "react";
import MedicalTestService from "@/http/medicalTest";
import { MedicalTest } from "@/http/types/medical";

type BoleznItem = {
  id: number;
  name: string;
  description: string;
  date: string;
};

const sortOptions = [
  { id: "1", label: "Грипп", type: "Gripp" },
  { id: "2", label: "Головная боль", type: "Golovnaya" },
  { id: "3", label: "Боль в животе", type: "Jivot" },
];

const sortOptions1 = [
  { id: "1", label: "По дате", type: "Data" },
  { id: "2", label: "По алфавиту", type: "Alphabite" },
];

const bolezni: BoleznItem[] = [
  { id: 1, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 2, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 3, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 4, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 5, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 6, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 7, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
];

const IstoriaPriemov = ({ id }: IstoriaPriemovProps) => {
  const renderItem = ({ item }: { item: BoleznItem }) => <ElementBolezni item={item} />;

  const [priemi, setPriemi] = useState<MedicalTest[]>();
  useEffect(() => {
    const handleGet = async () => {
      try {
        const resp = await MedicalTestService.getMedicalTests(Number(id));
        setPriemi(resp)
      } catch {
        Alert.alert("error");
      }
    };

    handleGet();
  }, []);

  return (
    <View style={styles.wrapper}>
      <DroppableList sortOptions={sortOptions} />
      <DroppableList sortOptions={sortOptions1} />

      <FlatList
        data={bolezni}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default IstoriaPriemov;
 */
