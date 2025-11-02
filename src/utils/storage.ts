import DefaultPreference from 'react-native-default-preference';

// Глобальное хранилище для синхронного доступа
let initializedStorage: { [key: string]: string } = {};

// Инициализация при запуске приложения
export const initializeStorage = async (): Promise<void> => {
  try {
    const allValues = await DefaultPreference.getAll();

    initializedStorage = allValues as { [key: string]: string };
    console.log('✅ Storage initialized with keys:', Object.keys(initializedStorage));
  } catch (error) {
    console.log('❌ Storage initialization error:', error);
    initializedStorage = {};
  }
};

// Синхронный доступ после инициализации
export const getInitializedItem = (key: string): string | null => {
  return initializedStorage[key] || null;
};

// Полный синхронный storage интерфейс
export const SyncStorage = {
  setItem: (key: string, value: string): void => {
    // Обновляем память синхронно
    initializedStorage[key] = value;
    // Асинхронно сохраняем в персистентное хранилище
    DefaultPreference.set(key, value).catch((error) => {
      console.log('❌ SyncStorage setItem error:', error);
    });
  },

  getItem: (key: string): string | null => {
    return initializedStorage[key] || null;
  },

  removeItem: (key: string): void => {
    // Удаляем из памяти синхронно
    delete initializedStorage[key];
    // Асинхронно удаляем из персистентного хранилища
    DefaultPreference.clear(key).catch((error) => {
      console.log('❌ SyncStorage removeItem error:', error);
    });
  },

  clear: (): void => {
    // Очищаем память синхронно
    initializedStorage = {};
    // Асинхронно очищаем персистентное хранилище
    DefaultPreference.clearAll().catch((error) => {
      console.log('❌ SyncStorage clear error:', error);
    });
  },

  // Дополнительные методы
  getAllKeys: (): string[] => {
    return Object.keys(initializedStorage);
  },

  getMultiple: (keys: string[]): { [key: string]: string | null } => {
    const result: { [key: string]: string | null } = {};

    keys.forEach(key => {
      result[key] = initializedStorage[key] || null;
    });

    return result;
  },

  setMultiple: (keyValuePairs: [string, string][]): void => {
    keyValuePairs.forEach(([key, value]) => {
      initializedStorage[key] = value;
      DefaultPreference.set(key, value).catch((error) => {
        console.log('❌ SyncStorage setMultiple error for key:', key, error);
      });
    });
  }
};

export default SyncStorage;
