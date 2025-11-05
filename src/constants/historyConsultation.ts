export interface ConsultationItem {
  id: string;
  category: string;
  title: string;
  date: string;
}

export const historyConsultation: ConsultationItem[] = [
  { id: "c1", category: "Физические упражнения", title: "Физическая подготовка для вашего ребенка", date: "22.12.2024" },
  { id: "c2", category: "Питание", title: "Сбалансированный рацион на неделю", date: "05.01.2025" },
  { id: "c3", category: "Профилактика", title: "Подготовка к сезону простуд", date: "10.01.2025" },
  { id: "c4", category: "Сон", title: "Гигиена сна для всей семьи", date: "15.01.2025" },
  { id: "c5", category: "Стресс", title: "Методы снижения стресса в повседневной жизни", date: "20.01.2025" },
  { id: "c6", category: "Иммунитет", title: "Как поддерживать иммунитет в межсезонье", date: "25.01.2025" },
  { id: "c7", category: "Зрение", title: "Профилактика ухудшения зрения при работе за ПК", date: "28.01.2025" },
  { id: "c8", category: "Сердце", title: "Кардионагрузки для начинающих: с чего начать", date: "02.02.2025" },
  { id: "c9", category: "Витамины", title: "Какие витамины важны зимой и почему", date: "06.02.2025" },
];


