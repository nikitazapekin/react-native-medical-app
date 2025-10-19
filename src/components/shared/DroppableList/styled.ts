import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dropdownButton: {
    width: 376,
    height: 56,
    borderRadius: 56,
    backgroundColor: COLORS.BLUE_DARK,
    justifyContent: "center",
    paddingHorizontal: 16,
    zIndex: 10, 
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.WHITE,
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
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.WHITE,
  },
  selectedItem: {
    backgroundColor: COLORS.BLACK, 
  },
  itemText: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
});
/* import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
 

   container: {
    alignItems: "center",
  },
  dropdownButton: {
    width: 376,
    height: 56,
    borderRadius: 56,
    backgroundColor: COLORS.BLUE_DARK,
 
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.WHITE,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownList: {
    width: 376,
    maxHeight: 200,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 8,
  },
  listItem: {
    padding: 16,
  
  },
  itemText: {
    fontSize: 16,
    color: COLORS.BLACK,
  },


})
 */
