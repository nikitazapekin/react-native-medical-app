import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 15,
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    marginTop: 15,
    width: 376,
    backgroundColor: COLORS.WHITE,
    flexDirection: "column",
    rowGap: 15,
    borderRadius: 10,
    paddingTop: 15,
    paddingLeft: 11,
    paddingRight: 11,
    paddingBottom: 33,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: "center",
  },
  recommendation: {},
  description: {},
  descriptionText: {
    fontSize: 20,
    fontWeight: 400,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 700
  },
  recommendationList: {
    marginTop: 8,
  },
  recomendationElement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    marginRight: 10,

  },
  recomendationElementText: {
    fontSize: 20,
    fontWeight: 400,
    flex: 1,
    marginLeft: 10,

    textAlignVertical: 'center',
  },
  example: {
    fontSize: 20,
    fontWeight: 400,
  }
});
