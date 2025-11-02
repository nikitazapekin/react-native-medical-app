import type { RouteProp } from "@react-navigation/native";
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
  [ROUTES.STACK.CHILDREN]:  { id: number };
  [ROUTES.STACK.SPISOKSOVETOV]: undefined;
  [ROUTES.STACK.CHILDREN_HEALTH_STATUS]: undefined;
  [ROUTES.STACK.MEDICALCARD]: undefined;
  [ROUTES.STACK.USER_FAVOURITE_DRUGS]: undefined;
  [ROUTES.STACK.USER_ANALYZE_HISTORY]: undefined;
  [ROUTES.STACK.USER_ISTORIA_PRIEMOV]: undefined;
  [ROUTES.STACK.USER_RECOMMENDATIONS]: undefined;
  [ROUTES.STACK.USER_EDIT_PROFILE]: undefined;
  [ROUTES.STACK.USER_CATALOG_DOCTORS]: undefined;
  [ROUTES.STACK.USER_EDIT_CHILDRESN]: { id: number };
  [ROUTES.STACK.USER_DRUG_DETAIL_SCREEN]: {
    drug: {
      id: number;
      title: string;
      description: string;
      price: number;
      type: string;
      dosage: string;
    };
  };
  [ROUTES.STACK.USER_SPISOK_SOVETOV]: undefined;
  [ROUTES.STACK.USER_OPROS]: undefined;
  [ROUTES.STACK.DOCTOR_RECORD_DETAIL]: {
    record: {
      id: string;
      time: string;
      patient: string;
      service: string;
    };
  };
  [ROUTES.STACK.ISTORIABOLEZNEI]: undefined;
};
export type FormNavigationProp = StackNavigationProp<RootStackParamList>;

export type UserEditChildrenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_EDIT_CHILDRESN>;
