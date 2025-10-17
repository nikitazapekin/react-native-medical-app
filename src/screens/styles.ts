import { StyleSheet } from 'react-native';
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TURQUOISE_LIGHT
  },

  content: {
    flex: 1,
    marginTop: 60,
    marginBottom: 80,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: "black"
  },

});
