import * as SecureStore from "expo-secure-store";

export const getUserToken = () => {
  return SecureStore.getItemAsync('userToken')
};

export const setUserToken = (userToken) => {
  return SecureStore.setItemAsync('userToken', userToken)
};

export const unsetUserToken = () => {
  return SecureStore.deleteItemAsync('userToken');
};

export const getPhoneNumber = () => {
  return SecureStore.getItemAsync('phoneNumber')
};

export const setPhoneNumber = (phoneNumber) => {
  return SecureStore.setItemAsync('phoneNumber', phoneNumber);
};

export const unsetPhoneNumber = () => {
  return SecureStore.deleteItemAsync('phoneNumber');
};