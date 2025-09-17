import type { StackNavigationProp } from "@react-navigation/stack";

import type { ROUTES } from "./routes";

export type RootStackParamList = {
  Home: undefined;
  [ROUTES.STACK.MAIN]: undefined;
  [ROUTES.STACK.AUTH]: undefined;
  [ROUTES.STACK.REGISTER]: undefined;
  [ROUTES.STACK.PROFILE]: undefined;
};
export type  FormNavigationProp = StackNavigationProp<RootStackParamList>;
