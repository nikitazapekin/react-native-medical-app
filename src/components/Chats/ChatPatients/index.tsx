import { useCallback, useState } from "react";
import {  Alert,FlatList, Text, TextInput, View } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";
import { debounce } from "lodash";

import DialogItem from "../../shared/DialogItem";
import { styles } from "../ChatDoctors/styled";

import SearchService from "@/http/search";

const mockPatients = [
  {
    id: 1,
    firstName: "Алексей",
    lastName: "Иванов",
    phoneNumber: "+7 999 123-45-67",
    region: "Москва",
    avatar: null,
    email: "ivanov@example.com",
    role: "patient"
  },
  {
    id: 2,
    firstName: "Мария",
    lastName: "Петрова",
    phoneNumber: "+7 999 123-45-68",
    region: "Санкт-Петербург",
    avatar: null,
    email: "petrova@example.com",
    role: "patient"
  },
  {
    id: 3,
    firstName: "Владимир",
    lastName: "Сидоров",
    phoneNumber: "+7 999 123-45-69",
    region: "Новосибирск",
    avatar: null,
    email: "sidorov@example.com",
    role: "patient"
  },
  {
    id: 4,
    firstName: "Елена",
    lastName: "Козлова",
    phoneNumber: "+7 999 123-45-70",
    region: "Екатеринбург",
    avatar: null,
    email: "kozlova@example.com",
    role: "patient"
  },
  {
    id: 5,
    firstName: "Дмитрий",
    lastName: "Николаев",
    phoneNumber: "+7 999 123-45-71",
    region: "Казань",
    avatar: null,
    email: "nikolaev@example.com",
    role: "patient"
  },
  {
    id: 6,
    firstName: "Светлана",
    lastName: "Волкова",
    phoneNumber: "+7 999 123-45-72",
    region: "Нижний Новгород",
    avatar: null,
    email: "volkova@example.com",
    role: "patient"
  },
  {
    id: 7,
    firstName: "Павел",
    lastName: "Орлов",
    phoneNumber: "+7 999 123-45-73",
    region: "Ростов-на-Дону",
    avatar: null,
    email: "orlov@example.com",
    role: "patient"
  },
  {
    id: 8,
    firstName: "Анна",
    lastName: "Лебедева",
    phoneNumber: "+7 999 123-45-74",
    region: "Краснодар",
    avatar: null,
    email: "lebedeva@example.com",
    role: "patient"
  },
];

interface SearchPatient {
  id: number;
  name: string;
  text: string;
  status: string;
  time: string;
  avatar: any;
}

const ChatsDoctor = () => {
  const [lastName, setLastName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchPatient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const transformPatientToSearchItem = (patient: any): SearchPatient => ({
    id: patient.id,
    name: `Пациент ${patient.lastName} ${patient.firstName?.charAt(0) || ''}.`,
    text: patient.region ? `Регион: ${patient.region}` : "Пациент",
    status: "Новое сообщение",
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    avatar: patient.avatar ? { uri: patient.avatar } : Avatar,
  });

  const mockSearchPatients = (searchTerm: string): any[] => {
    if (!searchTerm.trim()) return [];

    const filtered = mockPatients.filter(patient =>
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered;
  };

  const searchPatientsByLastName = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);

      return;
    }

    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      let patients: any[] = [];

      console.log('Using real API for patient search:', searchTerm);
      const result = await SearchService.searchPatients({
        lastName: searchTerm
      });

      patients = result.data || [];

      if (patients.length > 0) {
        const transformedPatients = patients.map(transformPatientToSearchItem);

        setSearchResults(transformedPatients);
      } else {
        setSearchResults([]);
      }
    } catch (err: any) {
      console.error('Patient search error:', err);

      const mockResults = mockSearchPatients(searchTerm);
      const transformedPatients = mockResults.map(transformPatientToSearchItem);

      setSearchResults(transformedPatients);

      if (transformedPatients.length === 0) {
        setError(`Пациенты с фамилией "${searchTerm}" не найдены`);
      }
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      searchPatientsByLastName(searchTerm).catch(()=> Alert.alert("err"));
    }, 300),
    [ ]
  );

  const handleInputLastName = (value: string) => {
    setLastName(value);

    if (value.trim()) {
      debouncedSearch(value);
    } else {
      setSearchResults([]);
      setIsSearching(false);
      setError(null);
    }
  };

  const displayData = isSearching ? searchResults : mockPatients.map(transformPatientToSearchItem);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Список чатов с пациентами</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите фамилию пациента"
        value={lastName}
        onChangeText={handleInputLastName}
      />

      {error && !loading && (

        <Text  >{error}</Text>

      )}

      {isSearching && !loading && searchResults.length === 0 && lastName.trim() && !error && (

        <Text  >
            Пациенты с фамилией "{lastName}" не найдены
        </Text>

      )}

      <View style={styles.wrapper}>
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DialogItem key={item.id} item={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !isSearching && !loading ? (
              <Text  >Нет доступных чатов с пациентами</Text>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default ChatsDoctor;

/* import { Text, View, TextInput } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";

import DialogItem from "../../shared/DialogItem";
import { styles } from "../ChatDoctors/styled";
import { useState } from "react";

const mockMessagesDoctor = [
  {
    id: 1,
    name: "Пациент Иванов А.С.",
    text: "Здравствуйте, беспокоит боль в горле",
    status: "Новое сообщение",
    time: "12:45",
    avatar: Avatar,
  },
  {
    id: 2,
    name: "Пациент Петрова М.К.",
    text: "Спасибо за консультацию!",
    status: "Прочитано",
    time: "11:30",
    avatar: Avatar,
  },
  {
    id: 3,
    name: "Пациент Сидоров В.П.",
    text: "Можно ли принимать это лекарство?",
    status: "Новое сообщение",
    time: "10:15",
    avatar: Avatar,
  },
  {
    id: 4,
    name: "Пациент Козлова Е.И.",
    text: "Записался на прием на завтра",
    status: "Прочитано",
    time: "09:20",
    avatar: Avatar,
  },
  {
    id: 5,
    name: "Пациент Николаев Д.О.",
    text: "Результаты анализов готовы?",
    status: "Новое сообщение",
    time: "08:45",
    avatar: Avatar,
  },
  {
    id: 6,
    name: "Пациент Волкова С.М.",
    text: "Боль прошла, спасибо!",
    status: "Прочитано",
    time: "14:10",
    avatar: Avatar,
  },
  {
    id: 7,
    name: "Пациент Орлов П.Т.",
    text: "Нужна повторная консультация",
    status: "Новое сообщение",
    time: "13:25",
    avatar: Avatar,
  },
  {
    id: 8,
    name: "Пациент Лебедева А.В.",
    text: "Когда будет следующий осмотр?",
    status: "Прочитано",
    time: "15:40",
    avatar: Avatar,
  },
];
const ChatsDoctor = () => {

  const [username, setUsername] = useState<string>("")

 const handleInputUsername = (value: string) => {
    setUsername(value);
  };

  return (
    <View style={styles.content}>

      <Text style={styles.title}>Список чатов</Text>
    <TextInput
      style={styles.input}
     placeholder="Введите имя пользователя"
        value={username}
        onChangeText={handleInputUsername}
    />
      <View style={styles.wrapper}>
        {mockMessagesDoctor.map((item) => (
          <DialogItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default ChatsDoctor;
  */
