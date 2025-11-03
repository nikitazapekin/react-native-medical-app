import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    height: 92,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    justifyContent: 'center',
  },
  cardTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "400",
  },
});


