import { atom } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLoginState = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId ? true : false;
  } catch (error) {
    console.error('Error retrieving userId from AsyncStorage:', error);
    return false;
  }
};


export const LoginCheck = atom({
  key: "LoginCheck",
  default: getLoginState(),
});

export const intervalIdAtom = atom({
  key: "intervalIdAtom",
  default: null,
});

export const locationAtom = atom({
  key: "locationAtom",
  default: {
    latitude: null,
    longitude: null,
  },
});

export const notificationAtom = atom({
  key: 'notificationAtom',
  default: [], 
});

export const webSocketAtom = atom({
  key: 'webSocketAtom',
  default: null, 
});

export const directionAtom = atom({
  key: 'directionAtom',
  default: null,
});
