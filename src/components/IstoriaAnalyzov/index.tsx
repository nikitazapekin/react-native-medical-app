import { useEffect, useState } from "react";
import { Alert,FlatList, Text, View } from "react-native";

import DroppableList from "../shared/DroppableList";
import ElementBolezni from "../shared/ElementBolezni";

import { styles } from "./styled";
import type { IstoriaAnalyzovProps } from "./types";

import { formatDate } from "@/helpers/isoDateFormat";
import MedicalAppointmentService from "@/http/medicalAppointment";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";

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
  const [analyzi, setAnalyzi] = useState<MedicalAppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const renderItem = ({ item }: { item: MedicalAppointmentResponse }) => (
    <ElementBolezni
      item={{
        id: item.id,
        name: item.appointmentName,
        description: item.description || "",
        date: formatDate( item.appointmentDate)
      }}
    />
  );

  useEffect(() => {
    const handleGet = async () => {
      try {
        setLoading(true);
        const resp = await MedicalAppointmentService.getAnalyzesByMedicalCardId(Number(id));

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
