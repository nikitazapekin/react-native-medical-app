import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  circle: {
    position: "absolute",
    left: 37,
    width: 57,
    height: 57,
    borderRadius: 28.5,
    backgroundColor: "white",
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    left: 18,
    width: 45,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonIcon: {
    width: 45,
    height: 48,
  },
});
