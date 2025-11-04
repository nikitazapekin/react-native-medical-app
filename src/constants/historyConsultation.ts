export interface ConsultationItem {
  id: string;
  category: string;
  title: string;
  date: string;
  childId: number;
  doctorId: number;
}

export const historyConsultation: ConsultationItem[] = [
  { id: "c1", category: "Физические упражнения", title: "Физическая подготовка для вашего ребенка", date: "22.12.2024", childId: 1, doctorId: 10 },
  { id: "c2", category: "Питание", title: "Сбалансированный рацион на неделю", date: "05.01.2025", childId: 1, doctorId: 3 },
  { id: "c3", category: "Профилактика", title: "Подготовка к сезону простуд", date: "10.01.2025", childId: 1, doctorId: 10 },
  { id: "c4", category: "Сон", title: "Гигиена сна для всей семьи", date: "15.01.2025", childId: 2, doctorId: 4 },
  { id: "c5", category: "Стресс", title: "Методы снижения стресса в повседневной жизни", date: "20.01.2025", childId: 2, doctorId: 4 },
  { id: "c6", category: "Иммунитет", title: "Как поддерживать иммунитет в межсезонье", date: "25.01.2025", childId: 2, doctorId: 3 },
  { id: "c7", category: "Зрение", title: "Профилактика ухудшения зрения при работе за ПК", date: "28.01.2025", childId: 3, doctorId: 6 },
  { id: "c8", category: "Сердце", title: "Кардионагрузки для начинающих: с чего начать", date: "02.02.2025", childId: 3, doctorId: 2 },
  { id: "c9", category: "Витамины", title: "Какие витамины важны зимой и почему", date: "06.02.2025", childId: 3, doctorId: 10 },
];


