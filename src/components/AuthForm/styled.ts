import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 373,
    borderRadius: 8,

    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  gap: {
    height: 20,
  },
  image: {
    width: 356,
    height: 356,
    marginBottom: 30,
  },
  header: {
    width: "100%",
    paddingTop: 17,
    paddingRight: 0,
    paddingBottom: 16,
    paddingLeft: 30,
    borderBottomColor: COLORS.GRAY_BORDER,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  fields: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
    marginBottom: 18,
  },
  headerText: {
    fontWeight: 700,
    fontSize: 20,
    color: COLORS.BLACK,
  },
  btns: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
    marginBottom: 15,
  },
  checkboxWrapper: {
    width: "100%",
    maxWidth: 304,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  checkbox: {
    width: 31,
    height: 31,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 8,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxText: {
    fontWeight: 400,
    fontSize: 16,
  },
});

/*
font-weight: 400;
font-size: 16px;
line-height: 150%;
*/
