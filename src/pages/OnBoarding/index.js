import React, { useEffect, useState } from "react";
import imgBackground from '../../assets/img/img_onboarding_logo.png';
import {Image, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = () => {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    AsyncStorage.getItem('email').then(value => setLoggedIn(value));
  });
  setTimeout(() => {
    if (loggedIn != null) {
      navigation.replace('Dashboard');
    } else {
      navigation.replace('Login');
    }
  }, 1000);
  return (
    <ScrollView
      style={{
        backgroundColor: '#DCECEB',
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={imgBackground}
            style={{
              flex: 1,
              height: 350,
              marginTop: 64,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text style={{color: '#50938f', fontWeight: 'bold', fontSize: 25}}>
          Aplikasi Catetan
        </Text>
        <Text style={{color: '#50938f', fontSize: 20, marginTop: 8}}>
          Created By : Gery Akbar Fauzi
        </Text>
      </View>
    </ScrollView>
  );
};

export default OnBoarding;
