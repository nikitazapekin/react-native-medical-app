import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    backgroundColor: "#D9F0FF",
    paddingTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
  },

  name: {
    fontWeight: "600",
    fontSize: 18,
    color: COLORS.BLACK,
    marginBottom: 10,
  },

  label: {
    fontWeight: "500",
    fontSize: 14,
    color: COLORS.BLACK,
    alignSelf: "flex-start",
  },

  value: {
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.BLACK,
    alignSelf: "flex-start",
    marginBottom: 6,
  },

  imagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    marginTop: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 6,
    width: "100%",
    paddingVertical: 10,
  },

  buttonText: {
    color: COLORS.WHITE,
    fontWeight: "500",
    fontSize: 15,
    textAlign: "center",
  },
});
