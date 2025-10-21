import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.BLUE_LIGHT,
    paddingLeft: 16,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 15,
  },
  selectedWrapper: {
    backgroundColor: COLORS.BLUE_DARK,
  },
  text: {
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.BLACK,
  },
  selectedText: {
    color: COLORS.WHITE,
    fontWeight: "600",
  },
});
/* import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.BLUE_LIGHT,
    paddingLeft: 16,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 15
  },
  text: {
    fontSize: 16,
    fontWeight: 400,
  },
});
 */
