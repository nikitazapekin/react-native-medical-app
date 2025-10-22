import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  mainWrapper: {
    alignItems: "center",
  },
  wrapper: {
    maxWidth: 374,
    backgroundColor: COLORS.WHITE,
    marginTop: 10,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
    width: "100%",
    borderRadius: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.BLACK,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  infoColumn: {
    flexDirection: "column",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: COLORS.BLACK,
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
  },
  valueMultiline: {
    fontSize: 14,
    color: COLORS.BLACK,
    lineHeight: 20,
  },
  gap: {
    height: 20,
  },
});
