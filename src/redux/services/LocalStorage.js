import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async value => {
  try {
    if (value && value) {
      const userId = value;
      await AsyncStorage.setItem('userId', userId);
    } else {
      console.error('Invalid user object:', value);
    }
  } catch (error) {
    console.error('Error storing user:', error);
  }
};

const getUser = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    if (userId !== null) {
      return userId;
    }
  } catch (error) {
    console.log(error);
  }
};

const storeToken = async value => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.log(error);
  }
};
const removeToken = async value => {
  try {
    await AsyncStorage.removeItem(value);
  } catch (error) {
    console.log(error);
  }
};

const storeLocation = async value => {
  try {
    await AsyncStorage.setItem('location', value);
  } catch (error) {
    console.log(error);
  }
};

const getLocation = async () => {
  try {
    const location = await AsyncStorage.getItem('location');
    if (location !== null) {
      return location;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeLocation = async value => {
  try {
    await AsyncStorage.removeItem(value);
  } catch (error) {
    console.log(error);
  }
};

const storeLocationName = async value => {
  try {
    await AsyncStorage.setItem('locationName', value);
  } catch (error) {
    console.log(error);
  }
};

const getLocationName = async () => {
  try {
    const locationName = await AsyncStorage.getItem('locationName');
    if (locationName !== null) {
      return locationName;
    }
  } catch (error) {
    console.log(error);
  }
};
const removeLocationName = async value => {
  try {
    await AsyncStorage.removeItem(value);
  } catch (error) {
    console.log(error);
  }
};

export {
  storeToken,
  getToken,
  removeToken,
  storeUser,
  getUser,
  storeLocation,
  getLocation,
  removeLocation,
  storeLocationName,
  getLocationName,
  removeLocationName,
};
