import React from 'react';
import AppNavigator from '@/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
/* import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import { COLORS } from './appStyles';
import CustomButton from "@/components/shared/Button";
 
type RootStackParamList = {
  Main: undefined;
};

type TabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<TabParamList, 'HomeTab'>;
type ProfileScreenNavigationProp = StackNavigationProp<TabParamList, 'ProfileTab'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}
 
function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Главная</Text>
      </View>
      <View style={styles.content}>
        <Text>Добро пожаловать на главный экран!</Text>
        <CustomButton 
          text="Перейти в профиль"
          handler={() => navigation.navigate('ProfileTab')}
          backgroundColor="blue"
        />
        <CustomButton 
          text="Перейти к настройкам"
          handler={() => navigation.navigate('SettingsTab')}
          backgroundColor="green"
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Профиль</Text>
      </View>
      <View style={styles.content}>
        <Text>Экран профиля пользователя</Text>
        <CustomButton 
          text="Редактировать профиль"
          handler={() => {}}
          backgroundColor="green"
        />
        <CustomButton 
          text="Назад"
          handler={() => navigation.goBack()}
          backgroundColor="gray"
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Настройки</Text>
      </View>
      <View style={styles.content}>
        <Text>Экран настроек приложения</Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
 
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
 
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Настройки',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,  
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 60,
  },
}); */
/* import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { COLORS } from './appStyles';

import CustomButton from "@/components/shared/Button";

export default function App() {
 
  return (
    <View style={styles.container}>

    <View style={styles.header}>
        <Text style={styles.headerText}>Хедер</Text>
      </View>
 
      <View style={styles.content}>
        <Text>Основное содержимое вашего приложения!</Text>

        <CustomButton 
        text="Редактировать профиль"
        handler={()=>{}}
        backgroundColor="green"
        />
        <StatusBar style="auto" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Футер</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK
 
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,  
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  footer: {
    height: 60,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerText: {
    fontSize: 16,
  },
});
  */
