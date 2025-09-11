import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./src/components/shared/Button";
import { COLORS, SIZES, FONTS,   utilityStyles } from './appStyles';
export default function App() {
  return (
    <View style={styles.container}>

    <View style={styles.header}>
        <Text style={styles.headerText}>Хедер</Text>
      </View>

      {/* Основное содержимое */}
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
 