import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
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
/* import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
  },

  title: {
    color: COLORS.BLACK,
    fontSize: 24,
    fontWeight: 700,
    paddingTop: 15,
    paddingBottom: 15,
  },
  wrapper: {
    width: 376,
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center"
    //paddingLeft: 5,
  },
});
 */
