import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
    width: "100%",
  },
  listWrapper: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 376,
    paddingBottom: 30,
  },
});
