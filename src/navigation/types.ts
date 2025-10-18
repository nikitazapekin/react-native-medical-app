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
};
export type FormNavigationProp = StackNavigationProp<RootStackParamList>;
