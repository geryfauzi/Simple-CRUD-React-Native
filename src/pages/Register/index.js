import React from 'react';
import imgBackground from '../../assets/img/img_register_logo.jpg';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import iconEmail from '../../assets/icons/ic_register_email.png';
import iconUser from '../../assets/icons/ic_register_user.png';
import iconPassword from '../../assets/icons/ic_register_password.png';
import realm from '../../database/realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from "@react-navigation/native";

let navigation = undefined;

function validation(data) {
  if (data.email === '' || data.email == null) {
    ToastAndroid.show('Alamat email harap diisi!', ToastAndroid.SHORT);
    return;
  }
  if (data.nama === '' || data.nama == null) {
    ToastAndroid.show('Nama harap diisi!', ToastAndroid.SHORT);
    return;
  }
  if (data.password === '' || data.password == null) {
    ToastAndroid.show('Password harap diisi!', ToastAndroid.SHORT);
    return;
  }
  if (data.confirmPassword === '' || data.confirmPassword == null) {
    ToastAndroid.show('Konfirmasi password harap diisi!', ToastAndroid.SHORT);
    return;
  }
  if (data.confirmPassword !== data.password) {
    ToastAndroid.show(
      'Password dan konfirmasi password harus sama!',
      ToastAndroid.SHORT,
    );
    return;
  }
  registerUser(data);
}

function checkEmail(email) {
  const user = realm.objects('User');
  const filteredEmail = user.filtered(`email == '${email}'`);
  console.log(filteredEmail.length);
  return filteredEmail.length <= 0;
}

function registerUser(data) {
  if (checkEmail(data.email)) {
    realm.write(() => {
      realm.create('User', {
        email: data.email,
        name: data.nama,
        password: data.password,
      });
    });
    SetUserSession(data);
  } else {
    ToastAndroid.show('Alamat email sudah terdaftar!', ToastAndroid.SHORT);
  }
}

async function SetUserSession(data) {
  try {
    await AsyncStorage.setItem('email', data.email);
    await AsyncStorage.setItem('name', data.nama);
    ToastAndroid.show(
      'Berhasil mendaftar! Selamat datang!',
      ToastAndroid.SHORT,
    );
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

const Register = () => {
  let data = {
    email: '',
    nama: '',
    password: '',
    confirmPassword: '',
  };
  navigation = useNavigation();
  checkEmail('gery@unpad.ac.id');
  return (
    <ScrollView style={{backgroundColor: '#FFF1CE'}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={imgBackground}
          style={{
            flex: 1,
            height: 250,
            marginTop: 32,
            marginStart: 32,
            marginEnd: 32,
          }}
        />
      </View>
      <Text
        style={{
          color: '#000000',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 18,
        }}>
        Silahkan mengisi data berikut
      </Text>
      <View
        style={{
          backgroundColor: '#FED593',
          borderRadius: 20,
          flexDirection: 'row',
          marginTop: 32,
          marginStart: 32,
          marginEnd: 32,
          height: 50,
          alignItems: 'center',
        }}>
        <Image
          source={iconEmail}
          style={{
            width: 32,
            height: 32,
            marginStart: 16,
          }}
        />
        <TextInput
          style={{
            color: '#FFF9E9',
            marginStart: 16,
            marginEnd: 16,
            fontSize: 17,
            flex: 1,
          }}
          placeholder="Alamat Email"
          placeholderTextColor="#FFF9E9"
          textContentType="emailAddress"
          onChangeText={text => (data.email = text)}
        />
      </View>
      <View
        style={{
          backgroundColor: '#FED593',
          borderRadius: 20,
          flexDirection: 'row',
          marginTop: 16,
          marginStart: 32,
          marginEnd: 32,
          height: 50,
          alignItems: 'center',
        }}>
        <Image
          source={iconUser}
          style={{
            width: 32,
            height: 32,
            marginStart: 16,
          }}
        />
        <TextInput
          style={{
            color: '#FFF9E9',
            marginStart: 16,
            marginEnd: 16,
            fontSize: 17,
            flex: 1,
          }}
          placeholder="Nama"
          placeholderTextColor="#FFF9E9"
          textContentType="name"
          onChangeText={text => (data.nama = text)}
        />
      </View>
      <View
        style={{
          backgroundColor: '#FED593',
          borderRadius: 20,
          flexDirection: 'row',
          marginTop: 16,
          marginStart: 32,
          marginEnd: 32,
          height: 50,
          alignItems: 'center',
        }}>
        <Image
          source={iconPassword}
          style={{
            width: 32,
            height: 32,
            marginStart: 16,
          }}
        />
        <TextInput
          style={{
            color: '#FFF9E9',
            marginStart: 16,
            marginEnd: 16,
            fontSize: 17,
            flex: 1,
          }}
          placeholder="Kata Sandi"
          placeholderTextColor="#FFF9E9"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={text => (data.password = text)}
        />
      </View>
      <View
        style={{
          backgroundColor: '#FED593',
          borderRadius: 20,
          flexDirection: 'row',
          marginTop: 16,
          marginStart: 32,
          marginEnd: 32,
          height: 50,
          alignItems: 'center',
        }}>
        <Image
          source={iconPassword}
          style={{
            width: 32,
            height: 32,
            marginStart: 16,
          }}
        />
        <TextInput
          style={{
            color: '#FFF9E9',
            marginStart: 16,
            marginEnd: 16,
            fontSize: 17,
            flex: 1,
          }}
          placeholder="Masukkan kembali Kata Sandi"
          placeholderTextColor="#FFF9E9"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={text => (data.confirmPassword = text)}
        />
      </View>
      <Pressable
        style={{
          backgroundColor: '#FFBB00',
          borderRadius: 14,
          elevation: 3,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginStart: 32,
          marginTop: 32,
          marginEnd: 32,
          marginBottom: 16,
          height: 50,
        }}
        onPress={() => validation(data)}>
        <Text
          style={{
            color: '#FFF1CE',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Daftar
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Register;
