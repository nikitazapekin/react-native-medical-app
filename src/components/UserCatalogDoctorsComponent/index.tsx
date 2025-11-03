import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AvatarImg from "@assets/mockPhotos/AvatarDoctorCatalog.png";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { Doctor } from "./types";

import DoctorCard from "@/components/shared/DoctorCard";
import DroppableList from "@/components/shared/DroppableList";
import SearchInput from "@/components/shared/SearchInput";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = [
  { id: "1", label: "По имени", type: "name" },
  { id: "2", label: "По специализации", type: "specialization" },
  { id: "3", label: "По рейтингу", type: "rating" },
];

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Незнамов Петр Петрович",
    spec: "Стоматолог",
    availability: "Сегодня с 9:00 до 17:00",
    avatar: AvatarImg,
    experience: "15 лет",
    education: "Московский государственный медико-стоматологический университет, лечебный факультет, 2008",
    specialization: "Терапевтическая стоматология, ортопедическая стоматология, имплантология",
    achievements: [
      "Кандидат медицинских наук",
      "Автор 12 научных публикаций",
      "Член Ассоциации стоматологов России"
    ],
    qualificationImprovement: [
      "Курс по современной имплантологии (2022)",
      "Семинар по эстетической стоматологии (2023)",
      "Повышение квалификации по эндодонтии (2024)"
    ],
    rating: 4.85,
  },
  {
    id: 2,
    name: "Иванова Мария Сергеевна",
    spec: "Кардиолог",
    availability: "Сегодня с 8:00 до 16:00",
    avatar: AvatarImg,
    experience: "12 лет",
    education: "Первый Московский государственный медицинский университет им. И.М. Сеченова, лечебный факультет, 2011",
    specialization: "Кардиология, артериальная гипертензия, аритмология",
    achievements: [
      "Врач высшей категории",
      "Победитель конкурса 'Лучший кардиолог года' (2022)",
      "Автор методических рекомендаций по лечению гипертонии"
    ],
    qualificationImprovement: [
      "Курс по интервенционной кардиологии (2021)",
      "Семинар по современным методам диагностики аритмий (2023)",
      "Повышение квалификации по сердечной недостаточности (2024)"
    ],
    rating: 5.0,
  },
  {
    id: 3,
    name: "Петров Иван Васильевич",
    spec: "Терапевт",
    availability: "Сегодня с 10:00 до 18:00",
    avatar: AvatarImg,
    experience: "18 лет",
    education: "Российский национальный исследовательский медицинский университет им. Н.И. Пирогова, лечебный факультет, 2005",
    specialization: "Терапия, пульмонология, гастроэнтерология",
    achievements: [
      "Врач высшей категории",
      "Заведующий терапевтическим отделением",
      "Организатор городских медицинских конференций"
    ],
    qualificationImprovement: [
      "Курс по пульмонологии (2020)",
      "Семинар по гастроэнтерологии (2022)",
      "Повышение квалификации по терапии (2024)"
    ],
    rating: 4.92,
  },
  {
    id: 4,
    name: "Смирнова Елена Дмитриевна",
    spec: "Невролог",
    availability: "Сегодня с 9:00 до 15:00",
    avatar: AvatarImg,
    experience: "14 лет",
    education: "Санкт-Петербургский государственный медицинский университет им. И.П. Павлова, лечебный факультет, 2009",
    specialization: "Неврология, головные боли, эпилептология, детская неврология",
    achievements: [
      "Доктор медицинских наук",
      "Автор 25 научных публикаций",
      "Член Европейской ассоциации неврологов"
    ],
    qualificationImprovement: [
      "Курс по лечению мигрени (2021)",
      "Семинар по эпилептологии (2022)",
      "Повышение квалификации по детской неврологии (2024)"
    ],
    rating: 4.78,
  },
  {
    id: 5,
    name: "Козлов Александр Николаевич",
    spec: "Хирург",
    availability: "Сегодня с 11:00 до 19:00",
    avatar: AvatarImg,
    experience: "20 лет",
    education: "Военно-медицинская академия им. С.М. Кирова, лечебный факультет, 2003",
    specialization: "Общая хирургия, лапароскопическая хирургия, абдоминальная хирургия",
    achievements: [
      "Врач высшей категории",
      "Заслуженный врач Российской Федерации",
      "Провел более 3000 успешных операций"
    ],
    qualificationImprovement: [
      "Курс по лапароскопической хирургии (2020)",
      "Семинар по роботической хирургии (2022)",
      "Повышение квалификации по абдоминальной хирургии (2024)"
    ],
    rating: 4.95,
  },
  {
    id: 6,
    name: "Волкова Анна Павловна",
    spec: "Офтальмолог",
    availability: "Сегодня с 8:30 до 16:30",
    avatar: AvatarImg,
    experience: "11 лет",
    education: "Московский государственный медико-стоматологический университет, лечебный факультет, 2012",
    specialization: "Офтальмология, рефракционная хирургия, детская офтальмология",
    achievements: [
      "Врач первой категории",
      "Специалист по LASIK и ФРК",
      "Член Российской ассоциации офтальмологов"
    ],
    qualificationImprovement: [
      "Курс по рефракционной хирургии (2021)",
      "Семинар по лечению катаракты (2023)",
      "Повышение квалификации по детской офтальмологии (2024)"
    ],
    rating: 4.65,
  },
  {
    id: 7,
    name: "Соколов Дмитрий Алексеевич",
    spec: "Отоларинголог",
    availability: "Сегодня с 10:00 до 18:00",
    avatar: AvatarImg,
    experience: "13 лет",
    education: "Санкт-Петербургский государственный педиатрический медицинский университет, лечебный факультет, 2010",
    specialization: "Отоларингология, ринология, хирургия ЛОР-органов, детская отоларингология",
    achievements: [
      "Врач высшей категории",
      "Кандидат медицинских наук",
      "Эксперт по эндоскопической хирургии носа"
    ],
    qualificationImprovement: [
      "Курс по эндоскопической ринохирургии (2021)",
      "Семинар по слухопротезированию (2023)",
      "Повышение квалификации по детской отоларингологии (2024)"
    ],
    rating: 4.88,
  },
  {
    id: 8,
    name: "Морозова Ольга Викторовна",
    spec: "Гинеколог",
    availability: "Сегодня с 9:00 до 17:00",
    avatar: AvatarImg,
    experience: "16 лет",
    education: "Российский университет дружбы народов, лечебный факультет, 2007",
    specialization: "Акушерство и гинекология, репродуктология, гинекологическая эндокринология",
    achievements: [
      "Врач высшей категории",
      "Специалист по ЭКО и репродуктологии",
      "Член Российской ассоциации репродукции человека"
    ],
    qualificationImprovement: [
      "Курс по репродуктивной медицине (2020)",
      "Семинар по гинекологической эндокринологии (2022)",
      "Повышение квалификации по УЗИ в гинекологии (2024)"
    ],
    rating: 4.72,
  },
  {
    id: 9,
    name: "Лебедев Сергей Михайлович",
    spec: "Уролог",
    availability: "Сегодня с 8:00 до 16:00",
    avatar: AvatarImg,
    experience: "17 лет",
    education: "Московский государственный медико-стоматологический университет, лечебный факультет, 2006",
    specialization: "Урология, андрология, урологическая онкология, детская урология",
    achievements: [
      "Врач высшей категории",
      "Кандидат медицинских наук",
      "Член Европейской ассоциации урологов",
      "Провел более 2000 операций"
    ],
    qualificationImprovement: [
      "Курс по лапароскопической урологии (2021)",
      "Семинар по урологической онкологии (2023)",
      "Повышение квалификации по андрологии (2024)"
    ],
    rating: 4.90,
  },
  {
    id: 10,
    name: "Новикова Татьяна Игоревна",
    spec: "Педиатр",
    availability: "Сегодня с 9:30 до 17:30",
    avatar: AvatarImg,
    experience: "19 лет",
    education: "Российский национальный исследовательский медицинский университет им. Н.И. Пирогова, педиатрический факультет, 2004",
    specialization: "Педиатрия, детская пульмонология, детская кардиология, неонатология",
    achievements: [
      "Врач высшей категории",
      "Доктор медицинских наук",
      "Автор учебника по детской пульмонологии",
      "Член Союза педиатров России"
    ],
    qualificationImprovement: [
      "Курс по неонатологии (2020)",
      "Семинар по детской кардиологии (2022)",
      "Повышение квалификации по вакцинопрофилактике (2024)"
    ],
    rating: 4.98,
  },
];

const UserCatalogDoctorsComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<FormNavigationProp>();

  const handleSort = () => {
  };

  const handleDoctorPress = (doctor: Doctor) => {
    navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor });
  };

  return (
    <View style={styles.content}>

      <DroppableList sortOptions={sortOptions} handler={handleSort} />

      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#000"
      />

      <Text style={styles.title}>Список врачей</Text>

      <View style={styles.listWrapper}>
        {mockDoctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.cardTouchable}
            onPress={() => handleDoctorPress(doctor)}
          >
            <DoctorCard
              name={doctor.name}
              spec={doctor.spec}
              availability={doctor.availability}
              avatar={doctor.avatar}
            />
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default UserCatalogDoctorsComponent;
