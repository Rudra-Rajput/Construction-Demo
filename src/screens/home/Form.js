import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import NetInfo from '@react-native-community/netinfo';
import { useAddTaskMutation } from '../../redux/services/Profile';
import { getToken } from '../../redux/services/LocalStorage';

const Form = ({ navigation }) => {

  const [addTask, {isLoading}] = useAddTaskMutation();

  const [name, setName] = useState('');
  const [taskDescription, setDescription] = useState('');
  const [additionalData, setAdditionalData] = useState('');
  const [image, setImage] = useState([]);
  console.log(image, 'image')

  const handleSubmit = async () => {
    try {
      // Step 1: Fetch the token
      const token = await getToken();
      if (!token) {
        throw new Error("Failed to retrieve token");
      }

      // Step 2: Check if the name field is filled
      if (name.length === 0) {
        alert('All fields are required');
        return;
      }

      const formData = new FormData();
      formData.append('taskName', name);
      formData.append('taskDescription', taskDescription);
      formData.append('additionalData', additionalData);
  
      // Assuming `image` contains the picked image object
      image.forEach((image, index) => {
        formData.append('taskFiles', {
          name: image.name,
          type: image.type,
          uri: image.uri,
        });
      });

      // Step 4: Check network connectivity
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        console.log('No internet connection');
      
        // Fetch existing data from AsyncStorage
        const existingDataJson = await AsyncStorage.getItem('taskData');
        let existingDataArray = [];
      
        if (existingDataJson) {
          try {
            existingDataArray = JSON.parse(existingDataJson);
          } catch (error) {
            console.error('Failed to parse existing data:', error);
          }
        }
      
        // Ensure existingDataArray is an array
        if (!Array.isArray(existingDataArray)) {
          existingDataArray = [];
        }
      
        // Add new task to the array
        const newTask = { name, taskDescription, additionalData, image };
        existingDataArray.push(newTask);
      
        // Store updated array back in AsyncStorage
        await AsyncStorage.setItem('taskData', JSON.stringify(existingDataArray));
      
        // Fetch and log the stored data to verify
        const storedData = await AsyncStorage.getItem('taskData');
        console.log(storedData, '23'); // This will log the updated array
        alert('Task is uploaded in offline mode')
        navigation.navigate('Main')
        return;
      }
      
      // Step 5: Make the API call to add the task
      try {
        const res = await addTask({ data: formData, token }); // Ensure the correct structure is used
        console.log('result', res);
        if (res?.data?.success === true) {
          alert('Task is uploaded')
          navigation.navigate('Main')
        }

        // Navigate to 'Main' screen if needed
        navigation.navigate('Main');
      } catch (error) {
        console.log('error', error);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error.message);
    }
  };

  const selectDocument = async () => {
    try {
      const doc = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles],
      });
      setImage(doc)
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled the document picker
      } else {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
          <Image source={require('../../assets/Icon/left.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Upload</Text>
      </View>

      <TouchableOpacity
        onPress={() => selectDocument()}
        activeOpacity={0.9}
        style={styles.imagesContainer}>
        <Image
          source={{ uri: image[0]?.uri ? image[0]?.uri : 'https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg' }}
          style={{ width: 200, height: 200, borderRadius: 20 }}
        />
      </TouchableOpacity>

      <View style={styles.textInput}>
        <TextInput
          label="Task"
          value={name}
          style={{ backgroundColor: '#FFFFFF' }}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={[styles.textInput, { marginTop: '8%' }]}>
        <TextInput
          label="Description"
          value={taskDescription}
          style={{ backgroundColor: '#FFFFFF' }}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => setDescription(text)}
        />
      </View>
      <View style={[styles.textInput, { marginTop: '8%' }]}>
        <TextInput
          label="Additional Data"
          value={additionalData}
          style={{ backgroundColor: '#FFFFFF' }}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => setAdditionalData(text)}
        />
      </View>

      <TouchableOpacity Disabled={isLoading} onPress={handleSubmit} style={styles.btn} activeOpacity={0.8}>
        {isLoading ? <ActivityIndicator size={'small'} color={'#FFFFFF'}/> : <Text style={styles.btnText}>POST</Text>}
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
