import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';

let data = [];

const Form = ({navigation}) => {

  const [name, setName] = useState('');
  const [taskDescription, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    if (name.length > 0) {
      let tempData = [];
      data = [];
      let x = JSON.parse(await AsyncStorage.getItem('DATA'));
      tempData = x;
      tempData?.map(item => {
        data.push(item);
      });
      data.push({taskName: name, taskDescription: taskDescription, taskFiles: image});
      await AsyncStorage.setItem('DATA', JSON.stringify(data));
      navigation.navigate('Main');
    }
    else{
        alert('All fields are required');
    }
  };

  const selectDocument = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setImage(doc[0]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>

     <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
          <Image source={require('../../assets/Icon/left.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Upload</Text>
     </View>

      <TouchableOpacity
        onPress={() => selectDocument()}
        activeOpacity={0.9}
        style={styles.imagesContainer}>
        <Image source={{uri: image.uri ? image.uri :'https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg'}} style={{width: 200, height: 200, borderRadius: 20}}/>
      </TouchableOpacity>

      <View style={styles.textInput}>
        <TextInput
          label="Task"
          value={name}
          style={{backgroundColor: '#FFFFFF'}}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={[styles.textInput, {marginTop: '8%'}]}>
        <TextInput
          label="Description"
          value={taskDescription}
          style={{backgroundColor: '#FFFFFF'}}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => setDescription(text)}
        />
      </View>
   
      <TouchableOpacity onPress={handleSubmit} style={styles.btn} activeOpacity={0.8}>
         <Text style={styles.btnText}>POST</Text>
      </TouchableOpacity> 

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imagesContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#fcfafa',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '5%',
    elevation: 1,
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '15%',
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
  }
});

export default Form;
