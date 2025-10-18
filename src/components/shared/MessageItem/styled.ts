import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
  },
  myWrapper: {
    justifyContent: "flex-end",
  },
  card: {
    maxWidth: 336,
    backgroundColor: COLORS.WHITE,
    width: "100%",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    paddingTop: 7,
    paddingRight: 11,
    paddingBottom: 21,
    paddingLeft: 7,
  },
  myCard: {
    backgroundColor:COLORS.GREEN_LIGHT,
  },
  main: {
    flexDirection: "row",
    columnGap: 13,
    alignItems: "flex-start",
  },
  logo: {
    width: 50,
    height: 50,
  },
  content: {
    flex: 1,
  },
  author: {
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.BLACK,
  },
  text: {
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.GRAY_TEXT,
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.GRAY_TEXT,
    alignSelf: "flex-start",
    marginTop: 4,
  }
});
