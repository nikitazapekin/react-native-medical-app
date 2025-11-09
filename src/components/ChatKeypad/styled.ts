import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginBottom: 100
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputDisabled: {
    opacity: 0.5,
  },
  smileyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  attachmentButton: {
    padding: 8,
  },
  emojiButton: {
    padding: 8,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
  icon: {
    width: 20,
    height: 20,
  },
  sendIcon: {
    width: 18,
    height: 18,
    tintColor: "#fff",
  },
});
/* import { StyleSheet } from "react-native";
import { COLORS } from "appStyles";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 154,
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  inputWrapper: {
    position: "relative",
    maxWidth: 376,
    width: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    height: 35,
  },
  input: {
    width: 576 - 68,
    paddingLeft: 15,

    fontSize: 14,
    fontWeight: 400,
  },
  smileyWrapper: {
    position: "absolute",
    right: 0,
    gap: 3,
    paddingRight: 15,

    top: 5,
    flexDirection: "row",
  },
  smiley: {},
});
 */
