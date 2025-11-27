import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {

  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginVertical: 16,
  },
  listWrapper: {
    gap: 12,
  },
  appointmentCard: {
    position: "relative",
  },
  cardWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
  },
});

