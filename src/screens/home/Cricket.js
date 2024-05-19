import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import customCss from '../../css/Index'

const Cricket = ({navigation}) => {
  return (
    <View style={customCss.mainContainer}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
          <Image source={require('../../assets/Icon/left.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Teams</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default Cricket;