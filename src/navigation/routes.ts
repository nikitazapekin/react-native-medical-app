export const ROUTES = {
  STACK: {
    MAIN: "Main",
    AUTH: "Auth",
    REGISTER: "Register",
    PROFILE: "Profile",
  },
  TABS: {
    HOME: "HomeTab",
    PROFILE: "ProfileTab",
    SETTINGS: "SettingsTab",
  },
} as const;

export const TEXTS = {
  HEADER: {
    HOME: "Главная",
    PROFILE: "Профиль",
    SETTINGS: "Настройки",
  },
  BUTTONS: {
    GO_TO_PROFILE: "Перейти в профиль",
    GO_TO_SETTINGS: "Перейти к настройкам",
    EDIT_PROFILE: "Редактировать профиль",
    BACK: "Назад",
  },
  CONTENT: {
    HOME: "Добро пожаловать на главный экран!",
    PROFILE: "Экран профиля пользователя",
    SETTINGS: "Экран настроек приложения",
  },
} as const;
