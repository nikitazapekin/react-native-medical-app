import { useCallback,  useState } from "react";
import {  Alert, FlatList, Text, TextInput, View } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";
import { debounce } from "lodash";

import DialogItem from "../../shared/DialogItem";

import { styles } from "./styled";

import SearchService from "@/http/search";
import type { Doctor } from "@/http/types/personInfo";

const mockMessages = [
  {
    id: 1,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
  {
    id: 2,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
];

interface SearchDoctor {
  id: number;
  name: string;
  text: string;
  status: string;
  time: string;
  avatar: any;
}

const Chats = () => {
  const [lastName, setLastName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const transformDoctorToSearchItem = (doctor: Doctor): SearchDoctor => ({
    id: doctor.id,
    name: `Доктор ${doctor.lastName} ${doctor.firstName.charAt(0)} `,
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
    setError(null);
    setIsSearching(true);

    try {
      const result = await SearchService.searchDoctors({
        lastName: searchTerm
      });

      console.log("RES", result);

      if (result.data && result.data.length > 0) {
        const transformedDoctors = result.data.map(transformDoctorToSearchItem);

        setSearchResults(transformedDoctors);
      } else {
        setSearchResults([]);
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError('Ошибка при поиске докторов');
      setSearchResults([]);

      const filteredMock = mockMessages.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredMock);
    } finally {
      setLoading(false);
    }
  };

  // Дебаунс поиска - 300ms
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      searchDoctorsByLastName(searchTerm).catch(()=>Alert.alert("err"));
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
      setError(null);
    }
  };

  const displayData = isSearching ? searchResults : mockMessages;

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Список чатов</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите фамилию доктора"
        value={lastName}
        onChangeText={handleInputLastName}
      />

      {error && !loading && (

        <Text  >{error}</Text>

      )}

      {isSearching && !loading && searchResults.length === 0 && lastName.trim() && (

        <Text  >
            Докторы с фамилией "{lastName}" не найдены
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
              <Text >Нет доступных чатов</Text>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default Chats;
/* import { Text, TextInput, View, FlatList, ActivityIndicator } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import DialogItem from "../../shared/DialogItem";
import SearchService from "@/http/search";
import type { Doctor } from "@/http/types/personInfo";

import { styles } from "./styled";

const mockMessages = [
  {
    id: 1,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
  {
    id: 2,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
];

interface SearchDoctor {
  id: number;
  name: string;
  text: string;
  status: string;
  time: string;
  avatar: any;
}

const Chats = () => {
  const [username, setUsername] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const transformDoctorToSearchItem = (doctor: Doctor): SearchDoctor => ({
    id: doctor.id,
    name: `Доктор ${doctor.lastName} ${doctor.firstName.charAt(0)}. `,
    text: doctor.specialization || "Специалист",
    status: doctor.specialization || "Врач",
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    avatar: doctor.avatar ? { uri: doctor.avatar } : Avatar,
  });

  // Функция поиска докторов
  const searchDoctors = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const result = await SearchService.searchDoctors({
        name: searchTerm
      });

      if (result.data && result.data.length > 0) {
        const transformedDoctors = result.data.map(transformDoctorToSearchItem);
        setSearchResults(transformedDoctors);
      } else {
        setSearchResults([]);
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError('Ошибка при поиске докторов');
      setSearchResults([]);

      const filteredMock = mockMessages.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredMock);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      searchDoctors(searchTerm);
    }, 300),
    []
  );

  const handleInputUsername = (value: string) => {
    setUsername(value);

    if (value.trim()) {
      debouncedSearch(value);
    } else {
      setSearchResults([]);
      setIsSearching(false);
      setError(null);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const displayData = isSearching ? searchResults : mockMessages;

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Список чатов</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите имя доктора для поиска"
        value={username}
        onChangeText={handleInputUsername}
      />

      {error && !loading && (

          <Text  >{error}</Text>

      )}

      {isSearching && !loading && searchResults.length === 0 && username.trim() && (
        <View  >
          <Text  >
            Докторы по запросу "{username}" не найдены
          </Text>
        </View>
      )}

      <View style={styles.wrapper}>
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DialogItem key={item.id} item={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !isSearching && !loading ? (
              <Text  >Нет доступных чатов</Text>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default Chats; */
/* import { Text, TextInput, View } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";

import DialogItem from "../../shared/DialogItem";

import { styles } from "./styled";
import { useState } from "react";

const mockMessages = [
  {
    id: 1,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
  {
    id: 2,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
  {
    id: 3,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },

  {
    id: 4,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
  {
    id: 5,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
  {
    id: 6,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },

  {
    id: 7,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
  {
    id: 8,
    name: "Доктор Боярова В.А.",
    text: "Как проявляется боль?",
    status: "Терапевт",
    time: "12:45",
    avatar: Avatar,
  },
];

const Chats = () => {

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
        {mockMessages.map((item) => (
          <DialogItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default Chats;
 */
/*

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

const mockMessages = [
  {id:1, from: "me",  to: "user", text: "Как проявляется боль?", time: "12:45", avatar: Avatar },
  {id:2, from: "user",  to: "me", text: "Сильно болит", time: "12:45", avatar:Avatar},

  {id:3, from: "me",  to: "user", text: "Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль?", time: "12:45", avatar: Avatar },
  {id:4, from: "user",  to: "me", text: "Сильно болит Сильно болит Сильно болит Сильно болит", time: "12:45", avatar:Avatar},

  {id:5, from: "me",  to: "user", text: "Как проявляется боль?", time: "12:45", avatar: Avatar },
  {id:6, from: "user",  to: "me", text: "Сильно болит", time: "12:45", avatar:Avatar},

  {id:7, from: "me",  to: "user", text: "Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль?", time: "12:45", avatar: Avatar },
  {id:8, from: "user",  to: "me", text: "Сильно болит Сильно болит Сильно болит Сильно болит", time: "12:45", avatar:Avatar}

];

*/
