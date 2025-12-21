// hooks/useAvatar.ts
import { useCallback,useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventEmitter from 'eventemitter3';

const avatarEventEmitter = new EventEmitter();

export const AVATAR_UPDATED_EVENT = 'AVATAR_UPDATED';

export interface UseAvatarReturn {
  avatarUrl: string | null;
  userRole: 'PATIENT' | 'DOCTOR' | null;
  isLoading: boolean;
  error: string | null;
  updateAvatar: (newAvatar: string) => Promise<void>;
  clearAvatar: () => void;
  refetchAvatar: () => Promise<void>;
}

export const useAvatar = (): UseAvatarReturn => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'PATIENT' | 'DOCTOR' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAvatar = useCallback(async (forceRefresh: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const storedAvatar = await AsyncStorage.getItem('userAvatar');
      const lastUpdated = await AsyncStorage.getItem('avatarLastUpdated');
      const avatarCacheTimeout = 30 * 60 * 1000;

      const isCacheValid = lastUpdated &&
        (Date.now() - parseInt(lastUpdated)) < avatarCacheTimeout;

      if (storedAvatar && isCacheValid && !forceRefresh) {
        setAvatarUrl(storedAvatar);

        const storedRole = await AsyncStorage.getItem('userRole') as 'PATIENT' | 'DOCTOR' | null;

        setUserRole(storedRole);

        setIsLoading(false);

        return;
      }

      const UserService = await import('@/http/userService');
      const userData = await UserService.default.getCurrentUser();
      const role = await UserService.default.getUserType();

      setAvatarUrl(userData.avatar || null);
      setUserRole(role);

      if (userData.avatar) {
        await AsyncStorage.setItem('userAvatar', userData.avatar);
        await AsyncStorage.setItem('avatarLastUpdated', Date.now().toString());
      }

      if (role) {
        await AsyncStorage.setItem('userRole', role);
      }

    } catch (err) {
      console.error('Error loading avatar:', err);
      setError('Не удалось загрузить аватар');

      try {
        const storedAvatar = await AsyncStorage.getItem('userAvatar');

        if (storedAvatar) {
          setAvatarUrl(storedAvatar);
        }
      } catch (cacheError) {
        console.error('Error loading from cache:', cacheError);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAvatar = useCallback(async (newAvatar: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await AsyncStorage.setItem('userAvatar', newAvatar);
      await AsyncStorage.setItem('avatarLastUpdated', Date.now().toString());

      setAvatarUrl(newAvatar);

      avatarEventEmitter.emit(AVATAR_UPDATED_EVENT, newAvatar);

    } catch (err) {
      console.error('Error updating avatar:', err);
      setError('Не удалось обновить аватар');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearAvatar = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('userAvatar');
      await AsyncStorage.removeItem('avatarLastUpdated');
      setAvatarUrl(null);
      avatarEventEmitter.emit(AVATAR_UPDATED_EVENT, null);
    } catch (err) {
      console.error('Error clearing avatar:', err);
    }
  }, []);

  const refetchAvatar = useCallback(async () => {
    await loadAvatar(true);
  }, [loadAvatar]);

  useEffect(() => {
    const handleAvatarUpdated = (newAvatar: string | null) => {
      console.log('Avatar updated event received');

      if (newAvatar) {
        setAvatarUrl(newAvatar);
      } else {

        loadAvatar(true).catch(()=> Alert.alert("err"));
      }
    };

    avatarEventEmitter.on(AVATAR_UPDATED_EVENT, handleAvatarUpdated);

    return () => {
      avatarEventEmitter.off(AVATAR_UPDATED_EVENT, handleAvatarUpdated);
    };
  }, [loadAvatar]);

  useEffect(() => {
    loadAvatar().catch(()=> Alert.alert("err"));
  }, [loadAvatar]);

  return {
    avatarUrl,
    userRole,
    isLoading,
    error,
    updateAvatar,
    clearAvatar,
    refetchAvatar,
  };
};
export const emitAvatarUpdate = (newAvatar: string) => {
  avatarEventEmitter.emit(AVATAR_UPDATED_EVENT, newAvatar);
};

export const subscribeToAvatarUpdates = (
  callback: (avatar: string | null) => void
) => {
  avatarEventEmitter.on(AVATAR_UPDATED_EVENT, callback);

  return () => {
    avatarEventEmitter.off(AVATAR_UPDATED_EVENT, callback);
  };
};
