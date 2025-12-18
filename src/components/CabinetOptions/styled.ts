import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  list: {
    width: "100%",
    rowGap: 10,
  },

  item: {
    width: "100%",
    backgroundColor: COLORS.WHITE,
    borderRadius: 9,
    alignItems: "center",
    paddingLeft: 12,
    height: 45,
    flexDirection: "row",
    gap: 14,
  },

  wrapper: {
    maxWidth: 376,
    paddingBottom: 20,
  },
  text: {
    fontWeight: 500,
    fontSize: 16,
    color: COLORS.BLACK,
    paddingTop: 15,
    paddingBottom: 15,
  },
  logoutButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
