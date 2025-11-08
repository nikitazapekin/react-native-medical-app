import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
  },

  title: {
    color: COLORS.BLACK,
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 15,
    paddingBottom: 15,
  },
  wrapper: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
  },

  input: {
    width: "100%",
    backgroundColor: COLORS.WHITE,
    height: 50,
    padding: 5,
    borderRadius: 5,
    marginBottom: 15,

  },
});
