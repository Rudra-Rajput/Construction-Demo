import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useStaffLoginMutation } from '../../redux/services/Profile';
import {storeToken} from '../../redux/services/LocalStorage';

const Login = ({navigation}) => {

  const [staffLogin, {isLoading}] = useStaffLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);

  const handleSubmit = async () => {
    const data = {email, password}
    const res = await staffLogin(data)
    const token = res?.data?.token;
    storeToken(token);
    console.log(res,'response')
    if (res?.data?.success === true) {
      navigation.navigate('Main')
    }
  }

  return (
    <View style={styles.mainContainer}>

        <View>
           {/* <Text style={{fontSize: 18, fontWeight: '600', letterSpacing: 1, color: '#000000', marginLeft: '5%', marginTop: '5%'}}>Login</Text> */}
           <Image source={require('../../assets/splash.png')} style={styles.logo}/>
        </View>

      <View style={[styles.textInput, {marginTop: '5%'}]}>
        <TextInput
          label="Username"
          value={email}
          mode='outlined'
          style={{backgroundColor: '#FFFFFF'}}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={[styles.textInput, {marginTop: '10%'}]}>
        <TextInput
          label="Password"
          value={password}
          secureTextEntry={show}
          mode='outlined'
          style={{backgroundColor: '#FFFFFF'}}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShow(!show)} activeOpacity={0.7} style={{position: 'absolute', top: 23, right: 10}}>
        <Text style={{fontSize: 14, fontWeight: '700',
            letterSpacing: .5
        }}>{show ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity disabled={isLoading} onPress={handleSubmit} style={styles.btn} activeOpacity={0.8}>
        {isLoading ? <ActivityIndicator size={'small'} color={'#FFFFFF'}/> : <Text style={styles.btnText}>POST</Text>}
      </TouchableOpacity> 

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    textInput: {
        width: '90%',
        alignSelf: 'center'
    },
    logo: {
       width: 100,
       height: 100,
       borderRadius: 50,
       alignSelf: 'center',
       marginTop: '15%'
    },
    btn: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#43ba63',
        borderRadius: 5,
        paddingVertical: 12
      },
      btnText: {
        color: '#FFFFFF',
        letterSpacing: 1,
        fontWeight: '600'
      },
})