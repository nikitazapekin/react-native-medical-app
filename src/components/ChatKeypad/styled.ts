import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginBottom: 50
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
