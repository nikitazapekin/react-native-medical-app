import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    paddingBottom: 40
  },

  title: {
    color: COLORS.BLACK,
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 15,
    paddingBottom: 15,
  },
  wrapper: {
    width: 376,
    flexDirection: "column",
    gap: 10,
    marginBottom: 15

  },
});
