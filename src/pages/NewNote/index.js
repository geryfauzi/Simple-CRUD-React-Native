import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import iconBack from '../../assets/icons/ic_new_note_back.png';
import iconSave from '../../assets/icons/ic_new_note_save.png';
import realm from '../../database/realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';

let navigation;

function saveNote(data) {
  if (data.title == null || data.title === '') {
    ToastAndroid.show('Judul tidak boleh kosong!', ToastAndroid.SHORT);
  } else if (data.content == null || data.content === '') {
    ToastAndroid.show('Isi catetan tidak boleh kosong!', ToastAndroid.SHORT);
  } else {
    insertNoteToDB(data);
  }
}

function insertNoteToDB(data) {
  data.id = Date.now();
  data.date = Date.now();
  realm.write(() => {
    realm.create('Notes', {
      id: data.id.toString(),
      title: data.title,
      content: data.content,
      date: data.date.toString(),
      userEmail: data.userEmail,
    });
  });
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: 'Dashboard'}],
    }),
  );
}

const NewNote = () => {
  navigation = useNavigation();
  const [email, setEmail] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('email').then(value => setEmail(value));
  });
  let data = {
    id: '',
    title: '',
    content: '',
    date: '',
    userEmail: email,
  };
  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          flexDirection: 'column',
          height: 50,
        }}>
        <Pressable
          style={{
            marginStart: 16,
            marginTop: 16,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={iconBack}
            style={{
              height: 35,
              width: 35,
            }}
          />
        </Pressable>
        <Pressable
          style={{
            marginEnd: 16,
            marginTop: 16,
            position: 'absolute',
            right: 0,
          }}
          onPress={() => saveNote(data)}>
          <Image
            source={iconSave}
            style={{
              height: 35,
              width: 35,
            }}
          />
        </Pressable>
      </View>
      <TextInput
        style={{
          color: '#7ECBFF',
          fontWeight: 'bold',
          fontSize: 25,
          flex: 1,
          marginStart: 16,
          marginEnd: 16,
          marginTop: 32,
          borderBottomWidth: 1,
          borderBottomColor: '#F2F2F2',
        }}
        placeholder="Judul Catetan"
        placeholderTextColor="#7ECBFF"
        onChangeText={text => (data.title = text)}
      />
      <TextInput
        style={{
          color: '#7ECBFF',
          fontSize: 20,
          flex: 1,
          marginStart: 16,
          marginEnd: 16,
          marginTop: 10,
        }}
        placeholderTextColor="#7ECBFF"
        placeholder="Isi Catetan"
        multiline={true}
        onChangeText={text => (data.content = text)}
      />
    </ScrollView>
  );
};

export default NewNote;
