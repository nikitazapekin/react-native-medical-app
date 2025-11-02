import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  searchWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    marginTop: 20,
    padding: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.BLACK,
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
});

