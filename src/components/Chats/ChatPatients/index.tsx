
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce } from "lodash";

import ChatService, { type ChatDTO } from "../../../http/chat";
import DialogItem from "../../shared/DialogItem";

import { styles } from "./styled";

import SearchService from "@/http/search";
import type { Doctor } from "@/http/types/personInfo";

interface SearchDoctor {
  id: number;
  name: string;
  text: string;
  status: string;
  time: string;
  avatar: any;
}

interface UserData {
  email: string | null;
  id: string | null;
  role: string | null;
}

const Chats = () => {
  const [lastName, setLastName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchDoctor[]>([]);
  const [userChats, setUserChats] = useState<ChatDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatsLoading, setChatsLoading] = useState<boolean>(true);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const getStoredUserData = async (): Promise<UserData> => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      const id = await AsyncStorage.getItem('userId');
      const role = await AsyncStorage.getItem('userRole');

      console.log('Stored user data:', { email, id, role });

      return { email, id, role };
    } catch (error) {
      console.error('Error getting user data:', error);

      return { email: null, id: null, role: null };
    }
  };

  const loadUserChats = async () => {
    try {
      setChatsLoading(true);

      const userData = await getStoredUserData();

      if (!userData.id || !userData.role) {
        console.log('User not authenticated');

        return;
      }

      console.log('Loading chats for user:', userData.id, 'role:', userData.role);

      const chats = await ChatService.getMyChats(Number(userData.id), userData.role);

      console.log('Loaded chats:', chats);

      setUserChats(chats);
    } catch (error: any) {
      console.error('Error loading chats:', error);

    } finally {
      setChatsLoading(false);
    }
  };

  const transformChatToSearchItem = (chat: ChatDTO): SearchDoctor => ({
    id: chat.participantId,
    name: chat.chatName,
    text: chat.lastMessage || "Нет сообщений",
    status: chat.participantName || "Участник",
    time: chat.lastMessageTime
      ? new Date(chat.lastMessageTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      : new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    avatar: chat.avatar ? { uri: chat.avatar } : Avatar,
  });

  const transformDoctorToSearchItem = (doctor: Doctor): SearchDoctor => ({
    id: doctor.id,
    name: `Доктор ${doctor.lastName} ${doctor.firstName.charAt(0)}.`,
    text: doctor.specialization || "Специалист",
    status: doctor.specialization || "Врач",
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    avatar: doctor.avatar ? { uri: doctor.avatar } : Avatar,
  });

  const searchDoctorsByLastName = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);

      return;
    }

    setLoading(true);

    setIsSearching(true);

    try {
      const result = await SearchService.searchDoctors({
        lastName: searchTerm
      });

      console.log("Search results:", result);

      if (result.data && result.data.length > 0) {
        const transformedDoctors = result.data.map(transformDoctorToSearchItem);

        setSearchResults(transformedDoctors);
      } else {
        setSearchResults([]);
      }
    } catch (err: any) {
      console.error('Search error:', err);

      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      searchDoctorsByLastName(searchTerm).catch(() => Alert.alert("Ошибка поиска"));
    }, 300),
    []
  );

  const handleInputLastName = (value: string) => {
    setLastName(value);

    if (value.trim()) {
      debouncedSearch(value);
    } else {
      setSearchResults([]);
      setIsSearching(false);

    }
  };

  const displayData = isSearching ? searchResults : userChats.map(transformChatToSearchItem);

  useEffect(() => {
    loadUserChats().catch(()=> Alert.alert("err"));
  }, []);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Список чатов</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите фамилию доктора для поиска"
        value={lastName}
        onChangeText={handleInputLastName}
      />

      {!isSearching && !chatsLoading && userChats.length === 0 && (
        <Text   >
          У вас пока нет чатов. Найдите доктора чтобы начать общение.
        </Text>
      )}

      <View style={styles.wrapper}>
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DialogItem key={item.id} item={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !isSearching && !chatsLoading && !loading ? (
              <Text >Нет доступных чатов</Text>
            ) : null
          }
          refreshing={chatsLoading}
          onRefresh={loadUserChats}
        />
      </View>
    </View>
  );
};

export default Chats;

/* import { useCallback, useState } from "react";
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
  */
