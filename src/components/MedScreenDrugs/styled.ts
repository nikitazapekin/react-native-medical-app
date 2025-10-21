import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  searchWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffffff",
    borderRadius: 30,
    marginTop: 20,
    padding: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  searchIcon: {
    width: 20, // Размер иконки
    height: 20, // Размер иконки
    marginLeft: 10,

  },
  title: {
    color: COLORS.BLACK,
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
    width: "100%",
  },
  listWrapper: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 376,
  },
});
