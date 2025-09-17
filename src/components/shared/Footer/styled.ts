import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  footer: {
    position: "absolute",

    bottom: 0,

    width: "100%",

    flexDirection: "row",

    alignItems: "center",
    zIndex: 1000,
    elevation: 5,

  },
  content: {
    width: "100%",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
    backgroundColor: COLORS.BLUE_MEDIUM,

    paddingTop: 7,
    paddingBottom: 47,
  },
  wrapper: {
    width: 64,
    height: 64,
  },
  image: {
    width: 44,
    height: 44,
    //padding: 5,
  },
});
