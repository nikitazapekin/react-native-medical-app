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
    width: 54,
    height: 54,

    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 44,
    height: 44,
  },

  activeWrapper: {
    backgroundColor: COLORS.BLUE_MEDIUM,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "center",
    alignContent: "center",
  },
});
