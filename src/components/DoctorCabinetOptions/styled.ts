import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  mainWrapper: {
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    width: 373,
    alignSelf: "center",
    marginTop: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.BLACK,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
  },
  infoRow: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.BLACK,
  },
  value: {
    fontSize: 16,
    color: COLORS.BLACK,
    lineHeight: 20,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
