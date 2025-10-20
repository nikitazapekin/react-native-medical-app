import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  calendarContainer: {
    width: 376,
    //  backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  arrows: {
    flexDirection: "row",
    gap: 16,
  },
  arrow: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  weekDay: {
    width: 40,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 18,
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});
/* import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

})
 */
