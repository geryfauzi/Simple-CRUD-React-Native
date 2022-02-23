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
import iconDelete from '../../assets/icons/ic_new_note_trash.png';
import {CommonActions, useNavigation} from '@react-navigation/native';

let navigation;

function deleteNote(id) {
  const notes = realm.objects('Notes');
  const filteredNote = notes.filtered(`id == '${id}'`);
  filteredNote.forEach(note => {
    realm.write(() => {
      realm.delete(note);
    });
  });
  backToHome();
}

function backToHome() {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: 'Dashboard'}],
    }),
  );
}

function saveNote(data, content, title) {
  if (title == null || title === '') {
    ToastAndroid.show('Judul tidak boleh kosong!', ToastAndroid.SHORT);
  } else if (content == null || content === '') {
    ToastAndroid.show('Isi catetan tidak boleh kosong!', ToastAndroid.SHORT);
  } else {
    const notes = realm.objects('Notes');
    const filteredNotes = notes.filtered(`id == '${data.id}'`);

    filteredNotes.forEach(note => {
      realm.write(() => {
        note.title = title;
        note.content = content;
        note.date = Date.now().toString();
      });
    });

    backToHome();
  }
}

const EditNote = ({route}) => {
  const {id} = route.params;
  navigation = useNavigation();
  let data = {
    id: '',
    title: '',
    content: '',
    date: '',
    userEmail: '',
  };
  const notes = realm.objects('Notes');
  const filteredNotes = notes.filtered(`id == '${id}'`);
  data = filteredNotes[0];
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
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
          onPress={() => {
            saveNote(data, content, title);
          }}>
          <Image
            source={iconSave}
            style={{
              height: 35,
              width: 35,
            }}
          />
        </Pressable>
        <Pressable
          style={{
            marginEnd: 64,
            marginTop: 16,
            position: 'absolute',
            right: 0,
          }}
          onPress={() => {
            deleteNote(data.id);
          }}>
          <Image
            source={iconDelete}
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
        value={title}
        onChangeText={text => setTitle(text)}
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
        onChangeText={text => setContent(text)}
        value={content}
      />
    </ScrollView>
  );
};

export default EditNote;
