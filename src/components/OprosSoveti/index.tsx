import { useState } from "react";
import { Image, Text, View } from "react-native";
import MockImage from "@assets/mockPhotos/picture.jpg";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import OprosButton from "../shared/OprosButton";

import { styles } from "./styled";

import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const test = [
  {
    id: 1,
    image: MockImage,
    question: "Как часто болит спина у вашего ребенка?",
    answers: [
      { id: 1, answer: "Несколько раз в месяц", value: 1 },
      { id: 2, answer: "Раз в неделю", value: 2 },
      { id: 3, answer: "Каждый день", value: 3 },
      { id: 4, answer: "Никогда", value: 4 },
    ],
  },
  {
    id: 2,
    image: MockImage,
    question: "Какой у ребенка режим дня?",
    answers: [
      { id: 1, answer: "Стабильный режим", value: 1 },
      { id: 2, answer: "Режим часто меняется", value: 2 },
      { id: 3, answer: "Режима нет", value: 3 },
    ],
  },
  {
    id: 3,
    image: MockImage,
    question: "Занимается ли ребенок спортом?",
    answers: [
      { id: 1, answer: "Да, регулярно", value: 1 },
      { id: 2, answer: "Иногда", value: 2 },
      { id: 3, answer: "Нет", value: 3 },
    ],
  },
];

const OprosSoveti = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = test[currentQuestionIndex];
  const selectedAnswerId = selectedAnswers[currentQuestion.id];

  const handleSelect = (answerId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const handleAnswer = () => {
    if (selectedAnswerId === undefined) {
      return;
    }

    if (currentQuestionIndex < test.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const navigation = useNavigation<FormNavigationProp>();

  if (isFinished) {
    navigation.navigate(ROUTES.STACK.PAYMENTS);

  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.question}>
          Вопрос {currentQuestion.id} из {test.length}
        </Text>
        <Text style={styles.title}>{currentQuestion.question}</Text>
        <Image style={styles.image} source={currentQuestion.image} alt="Image" />
        <View style={styles.list}>
          {currentQuestion.answers.map((item) => (
            <OprosButton
              key={item.id}
              text={item.answer}
              id={item.id}
              isSelected={selectedAnswerId === item.id}
              handler={() => handleSelect(item.id)}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          {currentQuestionIndex > 0 && (
            <CustomButton
              handler={handlePrevious}
              text="Назад"
              color="#1280b2"
              backgroundColor="#f0f0f0"
            />
          )}
          <CustomButton
            handler={handleAnswer}
            text={currentQuestionIndex < test.length - 1 ? "Далее" : "Завершить"}
            color="#fff"
            backgroundColor="#1280b2"
          />
        </View>
      </View>
    </View>
  );
};

export default OprosSoveti;
/* import { Image,Text, View } from "react-native";
import MockImage from "@assets/mockPhotos/picture.jpg";

import CustomButton from "../shared/Button";
import OprosButton from "../shared/OprosButton";

import { styles } from "./styled";

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
 */
