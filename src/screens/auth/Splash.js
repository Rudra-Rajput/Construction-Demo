import { Image, StatusBar, View } from 'react-native'
import React, { useEffect } from 'react';
import customCss from '../../css/Index';
import { getToken } from '../../redux/services/LocalStorage';
import { StackActions } from '@react-navigation/native';

const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const token = await getToken();
        const routeName = token !== undefined ? 'Main' : 'Login';
        navigation.dispatch(StackActions.replace(routeName));
      })();
    }, 2000);
  });  
  
  return (
    <View style={[customCss.mainContainer, {justifyContent: 'center', alignItems: 'center'}]}>
        <StatusBar backgroundColor={'#040405'}/>
        <Image source={require('../../assets/splash.png')} style={customCss.splashLogo}/>
    </View>
  )
}

export default Splash;