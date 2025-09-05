import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Хедер */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Хедер</Text>
      </View>

      {/* Основное содержимое */}
      <View style={styles.content}>
        <Text>Основное содержимое вашего приложения!</Text>
        <StatusBar style="auto" />
      </View>

      {/* Футер */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Футер</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a52121",
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20, // для статус бара на iOS
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1, // занимает все доступное пространство между хедером и футером
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
 