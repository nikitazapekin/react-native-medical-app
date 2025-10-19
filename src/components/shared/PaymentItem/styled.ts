import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    width: 356,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.25)",

    justifyContent: "space-between",
    flexDirection: "row",
  },

  content: {
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.BLACK,
  },
  description: {
    fontWeight: 400,
    fontSize: 13,
  },

  price: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: 500,
  },
});
