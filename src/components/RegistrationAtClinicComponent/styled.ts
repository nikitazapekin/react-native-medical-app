import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  section: {
    marginTop: 8,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  slotsRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  slot: {
    width: 177,
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  slotText: {
    textAlign: 'center',
    color: "#000",
  },
  buttonWrapper: {
    marginVertical: 16,
  },
});


