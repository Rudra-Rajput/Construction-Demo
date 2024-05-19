import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import customCss from '../../css/Index';
import {useGetAllUserQuery} from '../../redux/services/Profile';
import {useSelector} from 'react-redux';

const Cricket = ({navigation}) => {
  const {token} = useSelector(state => state.auth);

  const {data} = useGetAllUserQuery(token);
  console.log(data, 'data');

  return (
    <View style={customCss.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}>
          <Image
            source={require('../../assets/Icon/left.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Teams</Text>
      </View>

     <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '3%', marginTop: '5%'}}>
      <View style={[styles.card, {backgroundColor: '#5e548f'}]}>
        <Text style={styles.storeText}>Inactive User (0)</Text>
      </View>
      <View style={[styles.card, {backgroundColor: '#8f5473'}]}>
        <Text style={styles.storeText}>Active User ({data?.admins.length})</Text>
      </View>
     </View>

     <View style={styles.table}>
        <View>
          <Text style={styles.heading}></Text>
        </View>
     </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    marginHorizontal: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    marginLeft: '15%',
    letterSpacing: 1,
    color: '#000000',
    fontWeight: '600',
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
    marginTop: '10%',
    width: '94%',
    height: 200,
    borderWidth: 1,
    alignSelf: 'center'
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000'
  }
});

export default Cricket;
