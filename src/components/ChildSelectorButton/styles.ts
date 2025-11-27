import { StyleSheet } from 'react-native';
import { COLORS } from 'appStyles';

export const styles = StyleSheet.create({
  container: {

    marginVertical: 12,
    borderRadius: 16,
    backgroundColor: COLORS.WHITE,
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  totalCount: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.PRIMARY,
    backgroundColor: COLORS.TURQUOISE_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  textContainer: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  childDetails: {
    fontSize: 14,
    color: COLORS.GRAY_TEXT,
    fontWeight: '500',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  arrowIcon: {
    fontSize: 24,
    color: COLORS.GRAY_DARK,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  changeText: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
    fontWeight: '500',
  },
});
