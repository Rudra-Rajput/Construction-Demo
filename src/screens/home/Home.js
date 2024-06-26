import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Animated,
  ScrollView,
  RefreshControl
} from 'react-native';
import customCss from '../../css/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {
  useGetAllTaskQuery,
  useAddTaskMutation,
} from '../../redux/services/Profile';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from '../../redux/services/LocalStorage';
import {setUserToken} from '../../redux/slices/authSlice';
import NetInfo from '@react-native-community/netinfo';

const Home = ({navigation}) => {

  const isFocused = useIsFocused();

  const [isConnected, setIsConnected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const [addTask] = useAddTaskMutation();

  const [refreshing, setRefreshing] = useState(false);

  const load = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(async state => {
      setIsConnected(state.isConnected);
      setShowPopup(true);

      // Start the fade-in animation
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

      if (state.isConnected) {
        try {
          const storedDataString = await AsyncStorage.getItem('taskData');
          const storedData = JSON.parse(storedDataString);

          if (storedData && storedData.length > 0) {
            const token = await getToken();
            const successfulTasks = [];

            for (const item of storedData) {
              const formData = new FormData();
              formData.append('taskName', item.name);
              formData.append('taskDescription', item.taskDescription);
              formData.append('additionalData', item.additionalData);

              if (item.image && item.image.length > 0) {
                item.image.forEach((image, index) => {
                  formData.append('taskFiles', {
                    name: image.name,
                    type: image.type,
                    uri: image.uri,
                  });
                });
              }

              const res = await addTask({ data: formData, token });
              if (res?.data?.success === true) {
                successfulTasks.push(item);
              }
            }

            if (successfulTasks.length === storedData.length) {
              await AsyncStorage.clear();
            } else {
              // Remove only the successful tasks from storage
              const remainingTasks = storedData.filter(
                item => !successfulTasks.includes(item)
              );
              await AsyncStorage.setItem('taskData', JSON.stringify(remainingTasks));
            }
          }
        } catch (error) {
          console.error('Error processing tasks', error);
        }
      }
    });

    return () => unsubscribe();
  }, [fadeAnim, isFocused]);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = await getToken();
      dispatch(setUserToken({token: token}));
    })();
  }, []);

  const {token} = useSelector(state => state.auth);

  const {data: task, isLoading} = useGetAllTaskQuery(token);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'green'} />
        </View>
      ) : (
        <ScrollView 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => load()} />
          }
          style={customCss.mainContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Form')}
            style={{
              marginTop: '3%',
              marginHorizontal: '3%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '4%',
            }}
            activeOpacity={0.5}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                color: '#000000',
                letterSpacing: 0.5,
              }}>
              Dashboard
            </Text>
            <Image
              source={require('../../assets/Icon/plus.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          {showPopup && (
            <Animated.View style={[styles.popup, {opacity: fadeAnim}]}>
              <Text style={styles.popupText}>
                {isConnected
                  ? 'Internet is connected'
                  : 'Internet is not connected'}
              </Text>
            </Animated.View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '3%',
              justifyContent: 'space-between',
              marginTop: '5%',
            }}>
            <View style={[styles.card, {backgroundColor: '#548f64'}]}>
              <Text style={styles.storeText}>Total stores (5)</Text>
            </View>
            <View style={[styles.card, {backgroundColor: '#54798f'}]}>
              <Text style={styles.storeText}>Active stores (4)</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '3%',
              justifyContent: 'space-between',
              marginTop: '3%',
            }}>
            
          </View>

          <View style={[styles.table, {marginTop: '10%'}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.heading}>SL</Text>
              <Text style={styles.heading}>Task</Text>
              <Text style={styles.heading}>uploadedBy</Text>
              <Text style={styles.heading}>Time</Text>
              <Text style={styles.heading}>Action</Text>
            </View>
          </View>

          <FlatList
            scrollEnabled={false}
            data={task?.tasks}
            renderItem={({item, index}) => {
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: '4%',
                    }}>
                    <Text style={styles.tableItemtext}>{index + 1}</Text>
                    <View>
                      <Text style={styles.tableItemtext}>
                        {(() => {
                          if (!item?.taskName) return '';
                          const words = item.taskName.split(' ');
                          const truncated = words.slice(0, 3).join(' ');
                          return words.length > 3
                            ? `${truncated}...`
                            : truncated;
                        })()}
                      </Text>

                      {/* <Text style={styles.tableItemtext}>Id 1</Text> */}
                    </View>
                    <View>
                      <Text
                        style={
                          styles.tableItemtext
                        }>{`${item?.uploadedBy?.firstName} ${item?.uploadedBy?.lastName}`}</Text>
                      {/* <Text style={styles.tableItemtext}>{item?.uploadedBy?.phone}</Text> */}
                    </View>
                    <View>
                      <Text style={styles.tableItemtext}>
                        {new Date(item?.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Details', {item})}>
                      <Image
                        source={require('../../assets/eye.png')}
                        style={{width: 20, height: 20, tintColor: 'green'}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.horizontalLine}></View>
                </>
              );
            }}
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  card: {
    width: '47%',
    height: 80,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeText: {
    color: '#FFFFFF',
    letterSpacing: 0.0,
    fontSize: 14,
    fontWeight: '500',
  },
  table: {
    // borderWidth: 1,
    height: 55,
    marginHorizontal: '3%',
    borderColor: '#000000',
  },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#000000',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  tableItemtext: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
    textAlign: 'center',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginHorizontal: '3%',
    marginTop: '5%',
  },
  popup: {
    position: 'absolute',
    top: 20,
    padding: 10,
    backgroundColor: '#3f668c',
    borderRadius: 5,
    alignSelf: 'center',
    width: '90%',
  },
  popupText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
