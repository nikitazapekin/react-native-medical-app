import { Text, View } from "react-native";
import Avatar from "@assets/mockPhotos/Avatar.png";

import DialogItem from "../../shared/DialogItem";
import { styles } from "../ChatDoctors/styled";

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
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Список чатов</Text>
      <View style={styles.wrapper}>
        {mockMessagesDoctor.map((item) => (
          <DialogItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default ChatsDoctor;

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
