import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    color: COLORS.BLACK,
    fontSize: 24,
    fontWeight: "700",
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
    width: "100%",
  },
  listWrapper: {
    width: "100%",
    maxWidth: 376,
    marginTop: 10,
    gap: 10,
    alignItems: "center",
    paddingBottom: 25,
  },
  cardTouchable: {
    width: "100%",
    zIndex: 1,
  },
});

