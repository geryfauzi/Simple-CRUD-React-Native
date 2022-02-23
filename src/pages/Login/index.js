import React, {Component} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import imgBackground from '../../assets/img/img_login_logo.png';
import {CommonActions, useNavigation} from '@react-navigation/native';
import realm from '../../database/realm';
import AsyncStorage from '@react-native-async-storage/async-storage';

let navigation;

function checkUsers(data) {
  const user = realm.objects('User');
  const filteredEmail = user.filtered(
    `email == '${data.email}' AND password == '${data.password}'`,
  );
  return filteredEmail;
}

function login(data) {
  const userData = checkUsers(data);
  if (userData.length > 0) {
    SetUserSession(userData[0]);
  } else {
    ToastAndroid.show('Email atau password salah!', ToastAndroid.SHORT);
  }
}

async function SetUserSession(data) {
  try {
    console.log(data);
    await AsyncStorage.setItem('email', data.email);
    await AsyncStorage.setItem('name', data.name);
    ToastAndroid.show('Berhasil masuk! Selamat datang!', ToastAndroid.SHORT);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Dashboard'}],
      }),
    );
  } catch (e) {
    console.log(e);
  }
}

const Login = () => {
  navigation = useNavigation();
  let data = {
    email: '',
    password: '',
  };
  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={imgBackground}
          style={{resizeMode: 'contain', flex: 1, height: 250, marginTop: 64}}
        />
      </View>
      <Text
        style={{
          color: '#000000',
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'center',
          marginTop: 16,
        }}>
        Silahkan masuk untuk melanjutkan
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginStart: 32,
          marginEnd: 32,
          marginTop: 32,
          borderRadius: 12,
          backgroundColor: '#E2E2E2',
          justifyContent: 'center',
        }}>
        <TextInput
          style={{
            marginStart: 16,
            marginEnd: 16,
            flex: 1,
            fontSize: 17,
            color: '#FFFFFF',
          }}
          placeholder="Alamat Email"
          placeholderTextColor="#FFFFFF"
          onChangeText={text => (data.email = text)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginStart: 32,
          marginEnd: 32,
          marginTop: 16,
          borderRadius: 12,
          backgroundColor: '#E2E2E2',
          justifyContent: 'center',
        }}>
        <TextInput
          style={{
            marginStart: 16,
            marginEnd: 16,
            flex: 1,
            fontSize: 17,
            color: '#FFFFFF',
          }}
          placeholder="Kata Sandi"
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          onChangeText={text => (data.password = text)}
        />
      </View>
      <Pressable
        style={{
          backgroundColor: '#0CAEFD',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          borderRadius: 14,
          elevation: 3,
          marginStart: 32,
          marginEnd: 32,
          marginTop: 32,
          height: 50,
        }}
        onPress={() => login(data)}>
        <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 18}}>
          Masuk
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
          marginBottom: 16,
        }}>
        <Text style={{color: '#000000', fontSize: 15}}>Belum punya akun ?</Text>
        <Pressable>
          <Text
            style={{
              color: '#0CAEFD',
              marginStart: 5,
              fontWeight: 'bold',
              fontSize: 15,
            }}
            onPress={() => navigation.navigate('Register')}>
            Daftar
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Login;
