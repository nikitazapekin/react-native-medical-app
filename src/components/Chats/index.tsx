import { Text, View } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";

import DialogItem from "../shared/DialogItem";

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
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Список чатов</Text>
      <View style={styles.wrapper}>
        {mockMessages.map((item) => (
          <DialogItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default Chats;

/*

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
