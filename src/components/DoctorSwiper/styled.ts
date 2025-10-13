import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {

    flex: 1,
    width: 356,

    columnGap: 20,
    height: "auto"

  },
  card: {
    width: 320,
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 0,
    boxShadow: 'inset 2px -3px 7px 0 rgba(0, 0, 0, 0.25);'

  },

  flatListContent: {
    paddingHorizontal: 18,
    gap: 20,
  },
  image: {

    width: 320

  },
  textContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  inactiveDot: {
    backgroundColor: '#C7C7CC',
  },
});
