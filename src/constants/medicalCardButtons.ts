import { ROUTES } from "@/navigation/routes";

export const medicalCardButtons = [
  { id: 1, text: "История болезней",screen: ROUTES.STACK.ISTORIABOLEZNEI },
  { id: 2, text: "Сдача анализов", screen: ROUTES.STACK.USER_ANALYZE_HISTORY},
  { id: 3, text: "История приемов", screen: ROUTES.STACK.USER_ISTORIA_PRIEMOV},
  { id: 4, text: "Общее состояние", screen: ROUTES.STACK.CHILDREN_HEALTH_STATUS},
];
