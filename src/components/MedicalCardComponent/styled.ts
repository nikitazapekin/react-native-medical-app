import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: 376,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  title: {
    fontWeight: 400,
    fontSize: 16,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingTop: 16,
    paddingLeft: 36,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: "left",
    paddingTop: 16,
    paddingLeft: 36,
    alignSelf: "flex-start",
  },
  buttons: {
    marginTop: 10,
    flexDirection: "column",
    rowGap: 10,
    paddingBottom: 65,
    justifyContent: "center",
  },
});
