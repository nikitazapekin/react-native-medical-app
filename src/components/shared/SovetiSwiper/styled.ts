// styled.ts (для SovetiSwiper)
import { StyleSheet } from "react-native";

const CARD_WIDTH = 162;
const CARD_HEIGHT = 201;
const CARD_MARGIN = 9;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: CARD_HEIGHT + 50, // Добавляем место для текста
  },
  scrollContent: {
    paddingHorizontal: 16, // Отступы по краям
  },
  card: {
    width: CARD_WIDTH,
    marginRight: CARD_MARGIN,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardText: {
    padding: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
