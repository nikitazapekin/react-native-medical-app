import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

const CARD_RADIUS = 10;

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    rowGap: 15,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.BLACK,
  },
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
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 66,
    height: 64,
    marginLeft: 5,
    marginRight: 12,
    position: 'relative',
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
  primaryButtonWrapper: {
    alignItems: "center",
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
    textAlign: 'center', 
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: "400",
  },
});