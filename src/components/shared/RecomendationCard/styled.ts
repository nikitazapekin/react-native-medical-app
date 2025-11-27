import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

const CARD_RADIUS = 10;

export const styles = StyleSheet.create({
  card: {
    height: 92,
    padding: 16,
    borderRadius: CARD_RADIUS,
    backgroundColor: COLORS.WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 5,
  },
  category: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  row: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
    flex: 1,
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
  },
});
