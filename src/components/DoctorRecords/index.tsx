import React from "react";
import { 
  Image, 
  SectionList, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity  
} from "react-native";
import Med from "@assets/mockPhotos/Vector.png";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "@/navigation/routes";
import { FormNavigationProp } from "@/navigation/types";







// type DoctorRecordsNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   typeof ROUTES.STACK.DOCTOR_RECORD_DETAIL
// >;






interface Record {
  id: string;
  time: string;
  patient: string;
  service: string;
}

interface Section {
  title: string;
  data: Record[];
}

const sections: Section[] = [
  {
    title: "Понедельник, 28 декабря",
    data: [
      { id: "1", time: "10:00", patient: "Алексин Андрей Михайлович", service: "Обследование" },
      { id: "2", time: "11:00", patient: "Петров Иван Сергеевич", service: "Консультация" },
      { id: "3", time: "14:00", patient: "Сидорова Мария Владимировна", service: "Осмотр" },
    ],
  },
  {
    title: "Вторник, 29 декабря",
    data: [
      { id: "4", time: "09:30", patient: "Козлова Анна Дмитриевна", service: "Обследование" },
      { id: "5", time: "12:00", patient: "Николаев Денис Олегович", service: "Консультация" },
    ],
  },
  {
    title: "Среда, 30 декабря",
    data: [
      { id: "6", time: "10:00", patient: "Алексин Андрей Михайлович", service: "Повторный осмотр" },
      { id: "7", time: "11:30", patient: "Орлова Екатерина Викторовна", service: "Обследование" },
      { id: "8", time: "15:00", patient: "Громов Павел Александрович", service: "Консультация" },
    ],
  },
  {
    title: "Четверг, 31 декабря",
    data: [
      { id: "9", time: "09:00", patient: "Белова Юлия Игоревна", service: "Осмотр" },
      { id: "10", time: "13:00", patient: "Давыдов Артем Николаевич", service: "Обследование" },
      { id: "11", time: "16:00", patient: "Семенова Ольга Петровна", service: "Консультация" },
    ],
  },
];

const TodayDoctorRecords = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const handleRecordPress = (item: Record) => {

    navigation.navigate(ROUTES.STACK.DOCTOR_RECORD_DETAIL , { 
      record: item 
    });
  };

  const renderItem = ({ item }: { item: Record }) => (
  
    <TouchableOpacity 
      onPress={() => handleRecordPress(item)}
      style={[styles.appointmentItem, { zIndex: 1 }]}
    >
      <Image source={Med} style={styles.icon} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text style={styles.timeText}>Время: {item.time}</Text>
        <Text style={styles.patientText}>ФИО: {item.patient}</Text>
        <Text style={styles.serviceText}>Тип услуги: {item.service}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default TodayDoctorRecords;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F7FF",
    paddingHorizontal: 16,
  },
  sectionHeader: {
    backgroundColor: "#B2F0B2",
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionHeaderText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  headerLabel: {
    fontWeight: "500",
    color: "#000",
  },
  appointmentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginTop: 4,
  },
  timeText: {
    fontWeight: "500",
    marginBottom: 2,
  },
  patientText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 2,
  },
  serviceText: {
    fontSize: 14,
    color: "#555",
  },
});