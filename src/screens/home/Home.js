import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ActivityIndicator, Animated} from 'react-native';
import customCss from '../../css/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import { useGetAllTaskQuery } from '../../redux/services/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../redux/services/LocalStorage';
import { setUserToken } from '../../redux/slices/authSlice';
import NetInfo from '@react-native-community/netinfo';

const Home = ({navigation}) => {

  const [isConnected, setIsConnected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setShowPopup(true);

      // Start the fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setShowPopup(false));
        }, 2000);
      });
    });
    return () => unsubscribe();
  }, [fadeAnim]);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = await getToken();
      dispatch(setUserToken({token: token}));
    })();
  }, []);

  const { token } = useSelector(state => state.auth);
  console.log(token, '00000')

  const [data, setData] = useState([]);
  console.log(data, 'data')

  const { data:task, isLoading } = useGetAllTaskQuery(token);
  console.log(task, 'task')

  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const data = await AsyncStorage.getItem('DATA');
    setData(JSON.parse(data));
  };

  return (
    <>
    {isLoading ? 
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={'green'}/>
    </View> :
    <View style={customCss.mainContainer}>

       <TouchableOpacity onPress={() => navigation.navigate('Form')} style={{marginTop: '3%', marginHorizontal: '3%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4%'}} activeOpacity={0.5}>
          <Text style={{fontSize: 18, fontWeight: '800', color: '#000000', letterSpacing: .5}}>Dashboard</Text>
          <Image source={require('../../assets/Icon/plus.png')} style={styles.icon}/>
       </TouchableOpacity>

       {showPopup && (
        <Animated.View style={[styles.popup, { opacity: fadeAnim }]}>
          <Text style={styles.popupText}>
            {isConnected ? 'Internet is connected' : 'Internet is not connected'}
          </Text>
        </Animated.View>
      )}

       <View style={{marginLeft: '3%'}}>
         <Text style={{fontSize: 16, fontWeight: '500', color: '#000000', letterSpacing: .5}}>Stores (4)</Text>
       </View>

       <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: '3%', justifyContent: 'space-between', marginTop: '5%'}}>
         <View style={[styles.card, {backgroundColor: '#548f64'}]}>
           <Text style={styles.storeText}>Total stores (5)</Text>
         </View>
         <View style={[styles.card, {backgroundColor: '#54798f'}]}>
         <Text style={styles.storeText}>Active stores (4)</Text>
         </View>
       </View>
       <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: '3%', justifyContent: 'space-between', marginTop: '3%'}}>
         <View style={[styles.card, {backgroundColor: '#5e548f'}]}>
         <Text style={styles.storeText}>Inactive stores (1)</Text>
         </View>
         <View style={[styles.card, {backgroundColor: '#8f5473'}]}>
         <Text style={styles.storeText}>Newly joined stores (2)</Text>
         </View>
       </View>

       <View style={[styles.table, {marginTop: '10%'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
             <Text style={styles.heading}>S1</Text>
             <Text style={styles.heading}>Store info</Text>
             <Text style={styles.heading}>Owner info</Text>
             <Text style={styles.heading}>Zone</Text>
             <Text style={styles.heading}>Action</Text>
          </View>
       </View>

      <FlatList data={task?.tasks} renderItem={({item, index}) => {
        console.log(item?.uploadedBy, 'uploadedBy')
        return(
      <>
       <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '4%'}}>
          <Text style={styles.tableItemtext}>{index + 1}</Text>
          <View>
            <Text style={styles.tableItemtext}>Demo</Text>
            <Text style={styles.tableItemtext}>Id 1</Text>
          </View>
          <View>
            <Text style={styles.tableItemtext}>{`${item?.uploadedBy?.firstName} ${item?.uploadedBy?.lastName}`}</Text>
            <Text style={styles.tableItemtext}>{item?.uploadedBy?.phone}</Text>
          </View>
          <View>
            <Text style={styles.tableItemtext}>Bhopal</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Details', {item})}>
            <Image source={require('../../assets/eye.png')} style={{width: 20, height: 20, tintColor: 'green'}}/>
          </TouchableOpacity>
       </View>
       <View style={styles.horizontalLine}></View>
      </>
      )
    }}/>

    </View>}
    </> 
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25
  },
  card: {
    width: '47%',
    height: 80,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  storeText: {
    color: '#FFFFFF',
    letterSpacing: .0,
    fontSize: 14,
    fontWeight: '500'
  },
  table: {
    // borderWidth: 1,
    height: 55,
    marginHorizontal: '3%',
    borderColor: '#000000'
  },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#000000'
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000'
  },
  tableItemtext: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
    textAlign: 'center'
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginHorizontal: '3%',
    marginTop: '5%'
  },
  popup: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    backgroundColor: '#3f668c',
    borderRadius: 5,
    alignSelf: 'center',
    width: '90%'
  },
  popupText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
