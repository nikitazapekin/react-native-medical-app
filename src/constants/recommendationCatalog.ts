export interface RecommendationItem {
  id: string;
  category: string;
  title: string;
  date: string; // ISO или готовая строка
}

export const recommendationCatalog: RecommendationItem[] = [
  { id: "r1", category: "Физические упражнения", title: "Физическая подготовка для вашего ребенка", date: "22.12.2024" },
  { id: "r2", category: "Питание", title: "Сбалансированный рацион на неделю", date: "05.01.2025" },
  { id: "r3", category: "Профилактика", title: "Подготовка к сезону простуд", date: "10.01.2025" },
  { id: "r4", category: "Сон", title: "Гигиена сна для всей семьи", date: "15.01.2025" },
  { id: "r5", category: "Стресс", title: "Управление стрессом: практические советы", date: "20.01.2025" },
  { id: "r6", category: "Витамины", title: "Когда и какие витамины принимать", date: "25.01.2025" },
  { id: "r7", category: "Иммунитет", title: "Повышаем иммунитет зимой", date: "30.01.2025" },
  { id: "r8", category: "Зрение", title: "Гимнастика для глаз при работе за экраном", date: "04.02.2025" },
  { id: "r9", category: "Сердце", title: "Кардионагрузки: безопасный старт", date: "09.02.2025" },
  { id: "r10", category: "Психология", title: "Как поддерживать мотивацию к здоровому образу жизни", date: "14.02.2025" },
];


