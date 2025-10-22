import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
  },
  dropdownButton: {
    width: 376,
    height: 56,
    borderRadius: 56,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    paddingHorizontal: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.WHITE,
    flex: 1,
  },
  arrow: {
    width: 20,
    height: 20,
    marginRight: 23,
    transform: [{ rotate: "0deg" }],
  },
  arrowRotated: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownList: {
    width: 376,
    maxHeight: 200,
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    borderTopWidth: 0,
    marginTop: -10,
    zIndex: 9,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.WHITE,
    borderRadius: 56,
  },
  selectedItem: {
    backgroundColor: COLORS.WHITE,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
});
