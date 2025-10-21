import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    width: 376,
    justifyContent: "space-between",
    paddingTop: 6,
    paddingLeft: 14,
    paddingRight: 14 ,
    paddingBottom: 16,
    backgroundColor: COLORS.WHITE,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
    flexDirection: "row"
  },
  content: {
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    paddingTop: 8
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.GRAY_TEXT,
  },
  date: {
    fontSize: 13,
    fontWeight: 400,
    color: COLORS.GRAY_TEXT
  },
});
