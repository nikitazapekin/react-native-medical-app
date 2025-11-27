import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 13,
    width: 377,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  icon: {
    width: 17,
    height: 16,
  },

  preview: {
    justifyContent: "space-between",
    flexDirection: "row",

    alignItems: "center",
  },

  main: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    marginBottom: 15,
  },

  info: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },

  image: {
    width: 79,
    height: 76,
    borderRadius: 38,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.BLACK,
  },

  registration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  registrationRegular: {
    fontSize: 16,
    color: COLORS.BLACK,
  },

  registrationBold: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.BLACK,
  },

  location: {
    fontSize: 16,
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
    fontSize: 16,
    color: COLORS.BLACK,
    lineHeight: 18,
    marginTop: 10,
    paddingHorizontal: 2,
  },
});
