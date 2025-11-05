import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  category: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.BLACK,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.BLACK,
  },
  date: {
    fontSize: 12,
    color: COLORS.BLACK,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
  },
  description: {
    fontSize: 16,
    color: COLORS.BLACK,
    lineHeight: 22,
  },
});
