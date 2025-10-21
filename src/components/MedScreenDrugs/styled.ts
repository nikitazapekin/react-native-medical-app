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
    width: 20,
    height: 20,
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
  appointmentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
