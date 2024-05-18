import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

const CustomModal = ({isVisible, onBackButtonPress, onSwipeCancel, onSwipeComplete}) => {
  return (
      <Modal
        onBackButtonPress={onBackButtonPress}
        onSwipeCancel={onSwipeCancel}
        onSwipeComplete={onSwipeComplete}
        swipeDirection={'down'}
        propagateSwipe={true}
        style={{flex: 1, width: '100%', marginLeft: 0, marginBottom: 0}}
        isVisible={isVisible}>
        <View
          style={{
            height: '80%',
            width: '100%',
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15
          }}>
          <FlatList style={{alignSelf: 'center', marginTop: '15%'}} showsVerticalScrollIndicator={false} data={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]} numColumns={2} renderItem={() => {
            return(
            <TouchableOpacity style={{width: '45%', backgroundColor: 'red', height: 170, borderRadius: 20, margin: 8}}>
              
            </TouchableOpacity>
            )
          }}/>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({

});

export default CustomModal;
