import { StyleSheet } from 'react-native';
import { COLORS } from 'appStyles';

export const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.GRAY_TEXT,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.TURQUOISE_LIGHT,
    shadowOpacity: 0.15,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedAvatar: {
    backgroundColor: COLORS.PRIMARY,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  childDetails: {
    fontSize: 14,
    color: COLORS.GRAY_TEXT,
    fontWeight: '500',
  },
  checkmarkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkmark: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.GRAY_TEXT,
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '500',
  },
});

