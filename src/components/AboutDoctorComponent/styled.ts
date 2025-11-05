import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  descriptionCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 13,
    width: 377,
    alignSelf: "center",
    marginTop: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mainContent: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  doctorAvatar: {
    width: 79,
    height: 76,
    borderRadius: 38,
  },
  doctorInfo: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.BLACK,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingLabel: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  ratingValue: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: "600",
  },
  starIcon: {
    width: 17,
    height: 16,
  },
  doctorPosition: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  doctorDescription: {
    fontSize: 14,
    color: COLORS.BLACK,
    lineHeight: 18,
    marginTop: 10,
    paddingHorizontal: 2,
  },
  infoCard: {
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
  infoCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.BLACK,
    marginBottom: 20,
    textAlign: "center",
  },
  infoItem: {
    fontSize: 14,
    color: COLORS.BLACK,
    marginBottom: 15,
    lineHeight: 20,
  },
  infoLabel: {
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
});
