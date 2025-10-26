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
    borderRadius: 50
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
    padding: 5,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  tooltip: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
  },

  tooltipItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  tooltipText: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: '400',
  },
});
