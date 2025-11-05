import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
    maxWidth: 377,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
  },
  row: {
    flexDirection: "column",
  },
  label: {
    color: "#6B7280",
    fontWeight: "600",
  },
  value: {
    color: "#111827",
    fontWeight: "600",
  },
  clinicImage: {
    width: "100%",
    height: 165,
    borderRadius: 6,
    marginVertical: 10,
    resizeMode: "cover",
  },
  address: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonWrapper: {
    width: "100%",
    maxWidth: 356,
  },
});
