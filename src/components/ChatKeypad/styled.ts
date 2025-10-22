import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 154,
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  inputWrapper: {
    position: "relative",
    maxWidth: 376,
    width: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    height: 35,
  },
  input: {
    width: 576 - 68,
    paddingLeft: 15,

    fontSize: 14,
    fontWeight: 400,
  },
  smileyWrapper: {
    position: "absolute",
    right: 0,
    gap: 3,
    paddingRight: 15,

    top: 5,
    flexDirection: "row",
  },
  smiley: {},
});
