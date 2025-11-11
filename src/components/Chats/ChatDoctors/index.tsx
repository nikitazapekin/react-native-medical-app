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
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const getStoredUserData = async (): Promise<UserData> => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      const id = await AsyncStorage.getItem("userId");
      const role = await AsyncStorage.getItem("userRole");

      console.log("Stored user data:", { email, id, role });

      if (role) {
        setCurrentUserRole(role);
      }

      return { email, id, role };
    } catch (error) {
      console.error("Error getting user data:", error);

      return { email: null, id: null, role: null };
    }
  };

  const loadUserChats = async () => {
    try {
      setChatsLoading(true);
      const userData = await getStoredUserData();

      if (!userData.id || !userData.role) {
        console.log("User not authenticated");

        return;
      }

      console.log("Loading chats for user:", userData.id, "role:", userData.role);
      const chats = await ChatService.getMyChats(Number(userData.id), userData.role);

      console.log("Loaded chats with avatars:", chats);

      setUserChats(chats);
    } catch (error: any) {
      console.error("Error loading chats:", error);
    } finally {
      setChatsLoading(false);
    }
  };

  const getAvatarSource = (chat: ChatDTO, userRole: string | null) => {
    console.log(userRole);

    if (chat.avatar) {
      return { uri: chat.avatar };
    }

    return Avatar;
  };

  const transformChatToSearchItem = (chat: ChatDTO): SearchDoctor => {
    console.log("Transforming chat:", chat);

    const avatarSource = getAvatarSource(chat, currentUserRole);

    return {
      id: chat.participantId,
      name: chat.chatName,
      text: chat.lastMessage || "Нет сообщений",
      status: chat.participantName || "Участник",
      time: chat.lastMessageTime
        ? new Date(chat.lastMessageTime).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })
        : new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      avatar: avatarSource,
    };
  };

  const transformDoctorToSearchItem = (doctor: Doctor): SearchDoctor => {
    console.log("Transforming doctor:", doctor);

    let avatarSource = Avatar;

    if (doctor.avatar) {
      avatarSource = { uri: doctor.avatar };
    }

    return {
      id: doctor.id,
      name: `Доктор ${doctor.lastName} ${doctor.firstName.charAt(0)}.`,
      text: doctor.specialization || "Специалист",
      status: doctor.specialization || "Врач",
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      avatar: avatarSource,
    };
  };

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
        lastName: searchTerm,
      });

      console.log("Search results:", result);

      if (result.data && result.data.length > 0) {
        const transformedDoctors = result.data.map(transformDoctorToSearchItem);

        setSearchResults(transformedDoctors);
      } else {
        setSearchResults([]);
      }
    } catch (err: any) {
      console.error("Search error:", err);
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
    loadUserChats().catch(() => Alert.alert("Ошибка загрузки чатов"));
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
        <Text>У вас пока нет чатов. Найдите доктора чтобы начать общение.</Text>
      )}

      <View style={styles.wrapper}>
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DialogItem key={item.id} item={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !isSearching && !chatsLoading && !loading ? <Text>Нет доступных чатов</Text> : null
          }
          refreshing={chatsLoading}
          onRefresh={loadUserChats}
        />
      </View>
    </View>
  );
};

export default Chats;
