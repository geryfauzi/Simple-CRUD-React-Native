import React from 'react';
import {Pressable, ScrollView, Text} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let navigation;

async function logout() {
  try {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Login'}],
      }),
    );
  } catch (e) {}
}

const Settings = () => {
  navigation = useNavigation();
  return (
    <ScrollView
      style={{
        backgroundColor: '#FFFFFF',
      }}>
      <Pressable
        style={{
          flex: 1,
          marginStart: 32,
          marginEnd: 32,
          height: 60,
          justifyContent: 'center',
          borderBottomColor: '#F2F2F2',
          borderBottomWidth: 1,
        }}
        onPress={() => logout()}>
        <Text
          style={{
            color: '#000000',
            fontSize: 18,
          }}>
          Keluar
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Settings;
