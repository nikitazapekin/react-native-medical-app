import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    rowGap: 15,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.BLACK,
  },
  primaryButtonWrapper: {
    alignItems: "center",
  },
});
