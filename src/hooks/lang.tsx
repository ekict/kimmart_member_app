import i18next from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentLang = async () => {
  const lang = await AsyncStorage.getItem('@lang');
  i18next.changeLanguage(lang ?? 'en');
};

export const setCurrentLang = async (lang: string) => {
  i18next.changeLanguage(lang);
  await AsyncStorage.setItem('@lang', lang);
};
