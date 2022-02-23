import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import iconUser from '../../assets/icons/icon_dashborad_profile.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import realm from '../../database/realm';
import {useNavigation} from '@react-navigation/native';

let navigation;

const renderItem = ({item}) => {
  return <Item title={item.title} content={item.content} id={item.id} />;
};

const Dashboard = () => {
  navigation = useNavigation();
  //Daerah State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //Get Data dari session
  useEffect(() => {
    AsyncStorage.getItem('email').then(value => setEmail(value));
    AsyncStorage.getItem('name').then(value => setName(value));
  });
  //Get All User's Notes
  const notes = realm.objects('Notes');
  const data = notes.filtered(`userEmail == '${email}'`);
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height,
      }}>
      <View
        style={{backgroundColor: '#FFFFFF', height: 100, flexDirection: 'row'}}>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Image
            source={iconUser}
            style={{width: 50, height: 50, marginStart: 16, marginTop: 32}}
          />
        </Pressable>
        <View style={{flexDirection: 'column', marginTop: 32, marginStart: 8}}>
          <Text style={{color: '#7ECCFF', fontSize: 15}}>Hello</Text>
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 18}}>
            {name}
          </Text>
        </View>
        <Pressable
          style={{
            position: 'absolute',
            right: 0,
            marginEnd: 16,
            marginTop: 42,
          }}
          onPress={() => navigation.navigate('New Note')}>
          <Text
            style={{
              color: '#7ECCFF',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Tambah
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          color: '#000000',
          fontWeight: 'bold',
          fontSize: 30,
          marginStart: 16,
          marginTop: 16,
        }}>
        Catetan
      </Text>
      <SafeAreaView
        style={{
          marginTop: 8,
          marginStart: 12,
          marginEnd: 12,
          backgroundColor: '#FFFFFF',
          flex: 1,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          nestedScrollEnabled={true}
        />
      </SafeAreaView>
    </View>
  );
};

const Item = ({title, content, id}) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Edit Note', {
          id: id,
        });
      }}
      style={{
        backgroundColor: '#7ECBFF',
        height: 150,
        marginStart: 8,
        marginEnd: 8,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 20,
        flex: 1,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: '#121F3D',
          marginStart: 16,
          marginEnd: 16,
          marginTop: 16,
        }}>
        {title.length <= 10 ? title : title.substring(0, 10).concat('..')}
      </Text>
      <Text
        style={{
          color: '#121F3D',
          marginStart: 16,
          marginEnd: 16,
          marginTop: 8,
          marginBottom: 32,
        }}>
        {content.length <= 60 ? content : content.substring(0, 60).concat('..')}
      </Text>
    </Pressable>
  );
};

export default Dashboard;
