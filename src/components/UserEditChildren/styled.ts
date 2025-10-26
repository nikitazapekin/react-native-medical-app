
import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center"
  },

  childrenList: {
    flex: 1,
    marginBottom: 15,
    width: 376,
    height: 600
  },
  childrenGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },

  container: {
    flex: 1,
    paddingTop: 80,
    //   backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  wrapper: {
    width: "100%",
    maxWidth: 376,
    flexDirection: "column",
    gap: 10,
    marginBottom: 15,
    alignItems: "center",

  },
  title: {
    color: COLORS.BLACK,
    fontSize: 24,
    fontWeight: "700",
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "left", // центрируем текст
    width: "100%",
  },

});
