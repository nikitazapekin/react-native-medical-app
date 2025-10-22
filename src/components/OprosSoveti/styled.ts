import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 15,
  },
  content: {
    marginTop: 15,
    width: 376,
    backgroundColor: COLORS.WHITE,
    flexDirection: "column",
    rowGap: 15,
    alignItems: "center",
    borderRadius: 10,
    paddingTop: 15,
    paddingLeft: 11,
    paddingRight: 11,
    paddingBottom: 33,
  },

  title: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
  },
  question: {
    textAlign: "left",
    alignSelf: "flex-start",
  },
  image: {
    width: 340,
    height: 162,
    borderRadius: 20,
  },
  list: {
    width: 356,
    flexDirection: "column",
    rowGap: 15,
  },
  buttonsContainer: {
    flexDirection: "column",
    rowGap: 15,
  },
});
