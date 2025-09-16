import { StyleSheet } from 'react-native';
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TURQUOISE_LIGHT
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 30
  }
});
