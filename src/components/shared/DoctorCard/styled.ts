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
  doctorCard: {
    borderRadius: CARD_RADIUS,
    backgroundColor: COLORS.WHITE,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 66,
    height: 64,
    marginLeft: 5,
    marginRight: 12,
    position: "relative",
  },
  avatarImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 66,
    height: 64,
    borderRadius: 100,
  },
  doctorTextBlock: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.BLACK,
  },
  doctorSpec: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.BLACK,
  },
  availabilityPill: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    height: 23,
    borderRadius: 10,
    backgroundColor: COLORS.GREEN_LIGHT,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  pillIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.BLACK,
  },
  pillText: {
    fontSize: 14,
    color: COLORS.BLACK,
  },
});
