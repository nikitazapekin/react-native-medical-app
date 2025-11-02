import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

const CARD_RADIUS = 10;

export const styles = StyleSheet.create({
  cardShadowWrapper: {
    borderRadius: CARD_RADIUS,
    backgroundColor: COLORS.WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceCard: {
    borderRadius: CARD_RADIUS,
    backgroundColor: COLORS.WHITE,
    height: 92,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  serviceIconHalo: {
    width: 66,
    height: 64,
    borderRadius: "100%",
    backgroundColor: COLORS.BLUE_MEDIUM,
    marginLeft: 0,
  },
  serviceIcon: {
    position: "absolute",
    left: 25,
    width: 40,
    height: 40,
  },
  serviceText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: "400",
  },
});

