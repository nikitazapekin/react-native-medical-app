import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "appStyles";

import type { RootStackParamList } from "./types";

import { ROUTES } from "@/navigation/routes";
import AuthScreen from "@/screens/AuthScreen";
import CabinetScreen from "@/screens/Cabinet";
import CatalogScreen from "@/screens/CatalogScreen";
import ChatScreen from "@/screens/ChatScreen";
import ChatsScreen from "@/screens/ChatsScreen";
import DoctorAppointmentsScreen from "@/screens/DoctorAppointmentsScreen";
import DoctorCabinetScreen from "@/screens/DoctorCabinetScreen";
import DoctorChatScreen from "@/screens/DoctorChatScreen";
import DoctorEditCabinet from "@/screens/DoctorEditCabinetScreen";
import DoctorScreen from "@/screens/DoctorScreen";
import HomeScreen from "@/screens/HomeScreen";
import MedScreen from "@/screens/MedScreen";
import PaymentScreen from "@/screens/PaymentsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import TubeScreen from "@/screens/TubeScreen";

type TabParamList = {
  [ROUTES.TABS.PROFILE]: undefined;
  [ROUTES.TABS.SETTINGS]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={ROUTES.TABS.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>👤</Text>,
        }}
      />
      <Tab.Screen
        name={ROUTES.TABS.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarLabel: "Настройки",
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name={ROUTES.STACK.AUTH} component={AuthScreen} />
        <Stack.Screen name={ROUTES.STACK.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={ROUTES.STACK.HOMEPAGE} component={ProfileScreen} />
        <Stack.Screen name={ROUTES.STACK.MAIN} component={TabNavigator} />
        <Stack.Screen name={ROUTES.STACK.CATALOG} component={CatalogScreen} />
        <Stack.Screen name={ROUTES.STACK.CHAT} component={ChatScreen} />
        <Stack.Screen name={ROUTES.STACK.MED} component={MedScreen} />
        <Stack.Screen name={ROUTES.STACK.TUBE} component={TubeScreen} />
        <Stack.Screen name={ROUTES.STACK.CHATS} component={ChatsScreen} />
        <Stack.Screen name={ROUTES.STACK.CABINET} component={CabinetScreen} />
        <Stack.Screen name={ROUTES.STACK.PAYMENTS} component={PaymentScreen} />
        <Stack.Screen name={ROUTES.STACK.DOCTOR} component={DoctorScreen} />
        <Stack.Screen name={ROUTES.STACK.DOCTOR_CABINET} component={DoctorCabinetScreen} />
        <Stack.Screen name={ROUTES.STACK.DOCTOR_CHAT} component={DoctorChatScreen} />
        <Stack.Screen name={ROUTES.STACK.DOCTOR_APPOINTMENTS} component={DoctorAppointmentsScreen} />

        <Stack.Screen name={ROUTES.STACK.DOCTOR_CABINET_EDIT} component={DoctorEditCabinet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    height: 60,
  },
};
