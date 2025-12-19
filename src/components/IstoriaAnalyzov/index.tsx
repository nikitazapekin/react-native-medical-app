import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

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

// Моковые данные для отображения, если нет реальных
const mockAnalyzes: MedicalAppointmentResponse[] = [
  {
    id: 1,
    appointmentName: "Общий анализ крови",
    appointmentDate: "2025-01-15T10:00:00",
    appointmentTime: "10:00",
    description: "Стандартный общий анализ крови с определением лейкоцитов, эритроцитов, гемоглобина",
    appointmentType: "Анализы",
    doctorInitials: "Иванова А.П.",
    status: "COMPLETED",
    category: "Лабораторные исследования",
    title: "ОАК",
    duration: "30 минут",
    price: 1500,
    completedAt: "2025-01-15T11:30:00",
    patientName: "Петров Иван",
    childId: 123
  },
  {
    id: 2,
    appointmentName: "Биохимический анализ крови",
    appointmentDate: "2025-02-20T09:30:00",
    appointmentTime: "09:30",
    description: "Анализ на глюкозу, холестерин, печеночные ферменты, креатинин",
    appointmentType: "Анализы",
    doctorInitials: "Петров С.И.",
    status: "COMPLETED",
    category: "Лабораторные исследования",
    title: "Биохимия",
    duration: "40 минут",
    price: 2500,
    completedAt: "2025-02-20T12:00:00",
    patientName: "Петров Иван",
    childId: 123
  },
  {
    id: 3,
    appointmentName: "Анализ мочи",
    appointmentDate: "2025-03-10T11:15:00",
    appointmentTime: "11:15",
    description: "Общий клинический анализ мочи",
    appointmentType: "Анализы",
    doctorInitials: "Сидорова М.В.",
    status: "COMPLETED",
    category: "Лабораторные исследования",
    title: "ОАМ",
    duration: "20 минут",
    price: 800,
    completedAt: "2025-03-10T13:45:00",
    patientName: "Петров Иван",
    childId: 123
  },
  {
    id: 4,
    appointmentName: "УЗИ брюшной полости",
    appointmentDate: "2025-04-05T14:00:00",
    appointmentTime: "14:00",
    description: "Ультразвуковое исследование органов брюшной полости",
    appointmentType: "Анализы",
    doctorInitials: "Кузнецов Д.А.",
    status: "COMPLETED",
    category: "Инструментальные исследования",
    title: "УЗИ",
    duration: "45 минут",
    price: 3500,
    completedAt: "2025-04-05T15:30:00",
    patientName: "Петров Иван",
    childId: 123
  },
  {
    id: 5,
    appointmentName: "ЭКГ",
    appointmentDate: "2025-05-12T08:45:00",
    appointmentTime: "08:45",
    description: "Электрокардиограмма в покое",
    appointmentType: "Анализы",
    doctorInitials: "Васильева О.Н.",
    status: "COMPLETED",
    category: "Инструментальные исследования",
    title: "ЭКГ",
    duration: "25 минут",
    price: 1200,
    completedAt: "2025-05-12T10:15:00",
    patientName: "Петров Иван",
    childId: 123
  }
];

const IstoriaAnalyze = ({ id, selectedDate }: IstoriaAnalyzovProps) => {
  const [analyzi, setAnalyzi] = useState<MedicalAppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  console.log(useMockData);
  const renderItem = ({ item }: { item: MedicalAppointmentResponse }) => (
    <ElementBolezni
      item={{
        id: item.id,
        name: item.appointmentName,
        description: item.description || "",
        date: formatDate(item.appointmentDate)
      }}
    />
  );

  useEffect(() => {
    const handleGet = async () => {
      try {
        setLoading(true);
        const resp = await MedicalAppointmentService.getAnalyzesByMedicalCardId(Number(id), selectedDate);

        if (resp && resp.length > 0) {
          setAnalyzi(resp);
          setUseMockData(false);
        } else {

          setAnalyzi(mockAnalyzes);
          setUseMockData(true);
        }
      } catch {

        setAnalyzi(mockAnalyzes);
        setUseMockData(true);
        Alert.alert("Внимание", "Используются демонстрационные данные");
      } finally {
        setLoading(false);
      }
    };

    handleGet().catch(() => {
      setAnalyzi(mockAnalyzes);
      setUseMockData(true);
      setLoading(false);
      Alert.alert("Внимание", "Используются демонстрационные данные");
    });
  }, [id, selectedDate]);

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
