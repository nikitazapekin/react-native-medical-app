import { useEffect, useState } from "react";
import { Alert,FlatList, Text, View } from "react-native";

import DroppableList from "../shared/DroppableList";
import ElementBolezni from "../shared/ElementBolezni";

import { styles } from "./styled";
import type { IstoriaAnalyzovProps } from "./types";

import { formatDate } from "@/helpers/isoDateFormat";
import MedicalAppointmentService from "@/http/medicalAppointment";
import type { MedicalAppointment } from "@/http/types/medical";

const sortOptions = [
  { id: "1", label: "Грипп", type: "Gripp" },
  { id: "2", label: "Головная боль", type: "Golovnaya" },
  { id: "3", label: "Боль в животе", type: "Jivot" },
];

const sortOptions1 = [
  { id: "1", label: "По дате", type: "Data" },
  { id: "2", label: "По алфавиту", type: "Alphabite" },
];

const IstoriaAnalyze = ({ id }: IstoriaAnalyzovProps) => {
  const [analyzi, setAnalyzi] = useState<MedicalAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const renderItem = ({ item }: { item: MedicalAppointment }) => (
    <ElementBolezni
      item={{
        id: item.id,
        name: item.appointmentName,
        description: item.description,
        date: formatDate( item.appointmentDate)
      }}
    />
  );

  useEffect(() => {
    const handleGet = async () => {
      try {
        setLoading(true);
        const resp = await MedicalAppointmentService.getMedicalAppointments(Number(id));

        setAnalyzi(resp || []);
      } catch   {

        Alert.alert("Ошибка", "Не удалось загрузить данные анализов");
      } finally {
        setLoading(false);
      }
    };

    handleGet().catch(()=> {
      Alert.alert("Error");
    });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <DroppableList sortOptions={sortOptions} />
      <DroppableList sortOptions={sortOptions1} />

      {analyzi.length === 0 ? (
        <Text style={styles.emptyText}>Анализы не найдены</Text>
      ) : (
        <FlatList
          data={analyzi}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default IstoriaAnalyze;

/* import { FlatList, View, Text, Alert } from "react-native";

import DroppableList from "../shared/DroppableList";
import ElementBolezni from "../shared/ElementBolezni";

import { styles } from "./styled";
import { IstoriaAnalyzovProps } from "./types";
import { useEffect, useState } from "react";
import { MedicalAppointment } from "@/http/types/medical";
import MedicalAppointmentService from "@/http/medicalAppointment";

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
  { id: 8, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 9, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
];

const IstoriaAnalyze = ({ id }: IstoriaAnalyzovProps) => {
  const renderItem = ({ item }: { item: BoleznItem }) => <ElementBolezni item={item} />;
  const [analyzi, setAnalyzi] = useState<MedicalAppointment[]>();

  useEffect(() => {
    const handleGet = async () => {
      try {
        const resp = await MedicalAppointmentService.getMedicalAppointments(Number(id));

        setAnalyzi(resp);
      } catch {
        Alert.alert("Error");
      }
    };
    handleGet();
  }, []);
  return (
    <View style={styles.wrapper}>
      <DroppableList sortOptions={sortOptions} />
      <DroppableList sortOptions={sortOptions1} />

      <Text>
        id {id}
        {JSON.stringify(analyzi)}
      </Text>
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

export default IstoriaAnalyze;
 */
