import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import OprosButton from "../shared/OprosButton";

import { styles } from "./styled";
import type { OprosSovetiProps } from "./types";

import QuestionService from "@/http/question";
import type { QuestionResponse } from "@/http/types/survey";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const DefaultQuestionImage = require("@assets/mockPhotos/picture.jpg");

interface Answer {
  id: number;
  answer: string;
  value: number;
}

interface QuestionData {
  id: number;
  image: any;
  question: string;
  answers: Answer[];
}

const OprosSoveti = ({ id }: OprosSovetiProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);

  const navigation = useNavigation<FormNavigationProp>();

  useEffect(() => {
    const handleGet = async () => {
      try {

        const resp = await QuestionService.getQuestionsBySurveyId(Number(id));

        setQuestions(resp);
      } catch (error) {
        console.error("Error fetching questions:", error);
        Alert.alert("Ошибка", "Не удалось загрузить вопросы опроса");
      }
    };

    handleGet().catch(()=> Alert.alert("Error"));
  }, [id]);

  const transformQuestions = (apiQuestions: QuestionResponse[]): QuestionData[] => {
    return apiQuestions.map((apiQuestion, index) => {
      const answers: Answer[] = apiQuestion.questions.map((questionText, i) => ({
        id: i + 1,
        answer: questionText,
        value: i + 1,
      }));

      return {
        id: apiQuestion.id || index + 1,
        image: apiQuestion.image ? { uri: apiQuestion.image } : DefaultQuestionImage,
        question: apiQuestion.title,
        answers: answers,
      };
    });
  };

  const transformedQuestions = transformQuestions(questions);
  const currentQuestion = transformedQuestions[currentQuestionIndex];
  const selectedAnswerId = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;

  const handleSelect = (answerId: number) => {
    if (!currentQuestion) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const handleAnswer = () => {
    if (selectedAnswerId === undefined || !currentQuestion) {
      Alert.alert("Внимание", "Пожалуйста, выберите ответ");

      return;
    }

    if (currentQuestionIndex < transformedQuestions.length - 1) {
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

  useEffect(() => {
    if (isFinished) {
      console.log("Selected answers:", selectedAnswers);
      navigation.navigate(ROUTES.STACK.USER_RECOMMENDATIONS);
    }
  }, [isFinished, navigation, selectedAnswers, id]);

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text>В этом опросе пока нет вопросов</Text>
        </View>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text>Ошибка загрузки вопроса</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.question}>
          Вопрос {currentQuestionIndex + 1} из {transformedQuestions.length}
        </Text>
        <Text style={styles.title}>{currentQuestion.question}</Text>

        <Image
          style={styles.image}
          source={currentQuestion.image}
          defaultSource={DefaultQuestionImage}
          alt="Question image"
        />

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
            text={currentQuestionIndex < transformedQuestions.length - 1 ? "Далее" : "Завершить"}
            color="#fff"
            backgroundColor="#1280b2"
            disabled={selectedAnswerId === undefined}
          />
        </View>
      </View>
    </View>
  );
};

export default OprosSoveti;

/* import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import MockImage from "@assets/mockPhotos/picture.jpg";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import OprosButton from "../shared/OprosButton";

import { styles } from "./styled";
import type { OprosSovetiProps } from "./types";

import QuestionService from "@/http/question";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";
import { QuestionResponse } from "@/http/types/survey";

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

const OprosSoveti = ({id}: OprosSovetiProps) => {
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
    navigation.navigate(ROUTES.STACK.USER_RECOMMENDATIONS);
  }

  const [questions , setQuestions] = useState<QuestionResponse[]>()
  useEffect(() => {
    const handleGet = async () => {
      try {
        const resp = await QuestionService.getQuestionsBySurveyId(Number(id));

        console.log("RESP", resp);
      } catch {
        Alert.alert("Error");
      }
    };

    handleGet().catch(()=> Alert.alert("Error"));
  }, []);

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
 */
