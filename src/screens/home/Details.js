import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Switch } from 'react-native-paper';
import Slider from '../components/Slider';

const Details = ({navigation ,route}) => {

  const data = route.params?.item;
  console.log(data, 'data')

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);  

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
          <Image source={require('../../assets/Icon/left.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Details</Text>
      </View>

      <View style={{width: '15%', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', position: 'absolute', top: 12, right: 15
      }}>
        <TouchableOpacity>
          <Image source={require('../../assets/edit.png')} style={{width: 20, height: 20, tintColor: '#329939'}}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/trash.png')} style={{width: 20, height: 20, tintColor: '#e04338'}}/>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: '3%', marginBottom: '5%'}}>
       <View style={{width: '35%', justifyContent: 'center', alignItems: 'center'}}>
         <Text style={styles.headerText}>Disabled</Text>
         <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
       </View>
       <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
         <Text style={styles.headerText}>Status</Text>
         <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
       </View>
      </View>
      
        <Slider photos={data?.additionalFiles}/>

      <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
         <Text style={[styles.headerText, {marginLeft: 0}]}>Task</Text>
         <Text style={[styles.description, {marginTop: '2%'}]}>{data?.taskName}</Text>
      </View>
      <View style={{marginHorizontal: '5%', marginTop: '5%'}}>
         <Text style={[styles.headerText, {marginLeft: 0}]}>Description</Text>
         <Text style={[styles.description, {marginTop: '2%'}]}>{data?.taskDescription}</Text>
      </View>

    </View>
  )
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: 50,
        marginHorizontal: '2%',
        flexDirection: 'row',
        alignItems: 'center'
      },
      headerText: {
        fontSize: 15,
        marginLeft: '15%',
        letterSpacing: 1,
        color: '#000000',
        fontWeight: '600'
      },
      description: {
        fontSize: 13,
        fontWeight: '500',
        color: '#000000',
        letterSpacing: .5
      }
})