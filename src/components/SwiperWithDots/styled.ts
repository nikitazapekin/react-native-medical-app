import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

const CARD_WIDTH = 356;
const CARD_MARGIN = 16;

export const styles = StyleSheet.create({
  swiperContainer: {
    height: 200,
    marginBottom: 20,
  },
  flatListContent: {
    paddingHorizontal: CARD_MARGIN,
  },
  slide: {
    width: CARD_WIDTH,
    height: 180,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: CARD_MARGIN,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.BLACK,
  },
  slideContent: {
    fontSize: 14,
    color: "orange",
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "red",
    width: 12,
  },
  inactiveDot: {
    backgroundColor: COLORS.GRAY_LIGHT,
  },
});
