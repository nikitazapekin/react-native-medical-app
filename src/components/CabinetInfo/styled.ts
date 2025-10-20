import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 374,
    backgroundColor: COLORS.WHITE,
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 36,
    width: "100%",
    borderRadius: 13,
  },

  preview: {
    justifyContent: "space-between",
    flexDirection: "row",

    alignItems: "center",
  },

  main: {
    flex: 1,
    flexDirection: "row",
    gap: 7,
  },

  info: {
    flex: 1,
    rowGap: 4,
    flexDirection: "column",
  },

  image: {
    width: 90,
    height: 90,
  },

  title: {
    fontWeight: 500,
    fontSize: 16,
    color: COLORS.BLACK,
  },

  registration: {
    flexDirection: "row",
  },

  registrationRegular: {
    fontWeight: 300,
    fontSize: 12,
    color: COLORS.BLACK,
  },

  registrationBold: {
    fontWeight: 500,
    fontSize: 12,
    color: COLORS.BLACK,
  },

  location: {
    fontWeight: 300,
    fontSize: 12,
    color: COLORS.BLACK,
  },

  tel: {
    fontWeight: 300,
    fontSize: 12,
    color: COLORS.BLACK,
  },

  dots: {
    flexDirection: "row",
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 20,
    backgroundColor: COLORS.BLACK,
  },
  citate: {
    fontWeight: 300,
    fontSize: 12,
    color: COLORS.BLACK,
    marginTop: 11,
  },
});
