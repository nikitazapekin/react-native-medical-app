import { useCallback,  useState } from "react";
import {  Alert, FlatList, Text, TextInput, View } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";
import { debounce } from "lodash";

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

    } finally {
      setLoading(false);
    }
  };

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

  const displayData =   searchResults;

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
