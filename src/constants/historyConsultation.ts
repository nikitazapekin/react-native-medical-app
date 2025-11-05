export interface ConsultationItem {
  id: string;
  category: string;
  title: string;
  date: string;
  childId: number;
  doctorId: number;
  duration: string;
  price: string;
  patientName: string;
}

export const historyConsultation: ConsultationItem[] = [
  { id: "c1", category: "Физические упражнения", title: "Физическая подготовка для вашего ребенка", date: "22.12.2024", childId: 1, doctorId: 10, duration: "1 час 11 минут", price: "2000 ₽", patientName: "Иванов И. И." },
  { id: "c2", category: "Питание", title: "Сбалансированный рацион на неделю", date: "05.01.2025", childId: 1, doctorId: 3, duration: "45 минут", price: "1500 ₽", patientName: "Иванов И. И." },
  { id: "c3", category: "Профилактика", title: "Подготовка к сезону простуд", date: "10.01.2025", childId: 1, doctorId: 10, duration: "1 час 30 минут", price: "2500 ₽", patientName: "Иванов И. И." },
  { id: "c4", category: "Сон", title: "Гигиена сна для всей семьи", date: "15.01.2025", childId: 2, doctorId: 4, duration: "1 час", price: "1800 ₽", patientName: "Петрова М. С." },
  { id: "c5", category: "Стресс", title: "Методы снижения стресса в повседневной жизни", date: "20.01.2025", childId: 2, doctorId: 4, duration: "50 минут", price: "1700 ₽", patientName: "Петрова М. С." },
  { id: "c6", category: "Иммунитет", title: "Как поддерживать иммунитет в межсезонье", date: "25.01.2025", childId: 2, doctorId: 3, duration: "40 минут", price: "1400 ₽", patientName: "Петрова М. С." },
  { id: "c7", category: "Зрение", title: "Профилактика ухудшения зрения при работе за ПК", date: "28.01.2025", childId: 3, doctorId: 6, duration: "1 час 15 минут", price: "2200 ₽", patientName: "Сидоров А. В." },
  { id: "c8", category: "Сердце", title: "Кардионагрузки для начинающих: с чего начать", date: "02.02.2025", childId: 3, doctorId: 2, duration: "1 час 20 минут", price: "2400 ₽", patientName: "Сидоров А. В." },
  { id: "c9", category: "Витамины", title: "Какие витамины важны зимой и почему", date: "06.02.2025", childId: 3, doctorId: 10, duration: "35 минут", price: "1300 ₽", patientName: "Сидоров А. В." },
];


