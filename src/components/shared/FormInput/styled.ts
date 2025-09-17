import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 304,
    width: "100%",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.GRAY_DARK,

    borderRadius: 4,
  },
  label: {
    fontWeight: 400,
    fontSize: 16,
    color: COLORS.GRAY_DARK,
  },
});
