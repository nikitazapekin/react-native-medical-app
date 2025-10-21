import type { StackNavigationProp } from "@react-navigation/stack";

import type { ROUTES } from "./routes";

export type RootStackParamList = {
  Home: undefined;
  [ROUTES.STACK.MAIN]: undefined;
  [ROUTES.STACK.AUTH]: undefined;
  [ROUTES.STACK.REGISTER]: undefined;
  [ROUTES.STACK.HOMEPAGE]: undefined;
  [ROUTES.STACK.CATALOG]: undefined;
  [ROUTES.STACK.CHAT]: undefined;
  [ROUTES.STACK.CHATS]: undefined;
  [ROUTES.STACK.MED]: undefined;
  [ROUTES.STACK.TUBE]: undefined;
  [ROUTES.STACK.CABINET]: undefined;
  [ROUTES.STACK.PAYMENTS]: undefined;
  [ROUTES.STACK.DOCTOR]: undefined; //главная страница доктора
  [ROUTES.STACK.DOCTOR_CHAT]: undefined; //страница чата доктора
  [ROUTES.STACK.DOCTOR_CABINET]: undefined; //страница профиля доктора
  [ROUTES.STACK.DOCTOR_APPOINTMENTS]: undefined; //страница записей доктора
  [ROUTES.STACK.DOCTOR_CABINET_EDIT]: undefined; //страница htlf htlfr редактирования инфы доктора
  [ROUTES.STACK.CHILDRENS]: undefined;
  [ROUTES.STACK.CHILDREN]: undefined;
  [ROUTES.STACK.SPISOKSOVETOV]: undefined;
  [ROUTES.STACK.MEDICALCARD]: undefined;
    [ROUTES.STACK.ISTORIABOLEZNEI]: undefined;
};
export type FormNavigationProp = StackNavigationProp<RootStackParamList>;
