import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  category: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },
  footer: {
    flexDirection: "column",
    gap: 4,
  },
  date: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },
  doctor: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },
});
