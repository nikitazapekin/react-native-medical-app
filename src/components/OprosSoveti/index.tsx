import { Image,Text, View } from "react-native";
import MockImage from "@assets/mockPhotos/picture.jpg";

import CustomButton from "../shared/Button";
import OprosButton from "../shared/OprosButton";

import { styles } from "./styled";
/*
const btns = [
  {id: 1, text: ""},
  {id: 2, text: ""},
  {id: 3, text: ""},
  {id: 4, text: ""},
] */

const test = [
  {
    id: 1,
    image: MockImage,
    question: "Как часто болит спина у вашего ребенка?",
    answers: [
      { id: 1, answer: "Несколько раз в месяц", value: 1 },
      { id: 2, answer: "Несколько раз в месяц", value: 1 },
      { id: 3, answer: "Несколько раз в месяц", value: 1 },
      { id: 4, answer: "Несколько раз в месяц", value: 1 },
    ],
  },

  {
    id: 2,
    image: MockImage,
    question: "Как часто болит спина у вашего ребенка?",
    answers: [
      { id: 1, answer: "Несколько раз в месяц", value: 1 },
      { id: 2, answer: "Несколько раз в месяц", value: 1 },
      { id: 3, answer: "Несколько раз в месяц", value: 1 },
      { id: 4, answer: "Несколько раз в месяц", value: 1 },
    ],
  },

  {
    id: 3,
    image: MockImage,
    question: "Как часто болит спина у вашего ребенка?",
    answers: [
      { id: 1, answer: "Несколько раз в месяц" , value: 1},
      { id: 2, answer: "Несколько раз в месяц" , value: 1},
      { id: 3, answer: "Несколько раз в месяц", value: 1},
      { id: 4, answer: "Несколько раз в месяц", value: 1 },
    ],
  },
];
const OprosSoveti = () => {
  const handleAnswer = () => {};
  const handleSelect = () => {

  };

  return (

    <View style={styles.wrapper}>
      <View style={styles.content}>

        <Text style={styles.question}>Вопрос {test[0].id} </Text>
        <Text style={styles.title}>{test[0].question}</Text>
        <Image style={styles.image} source={test[0].image} alt="Image" />
        <View style={styles.list}>
          {test[0].answers.map((item) => (
            <OprosButton key={item.id} text={item.answer} id={item.id}
              handler={handleSelect}
            />
          ))}
        </View>
        <CustomButton handler={handleAnswer} text="Ответить" color="#fff" backgroundColor="#1280b2" />
      </View>
    </View>
  );
};

export default OprosSoveti;
