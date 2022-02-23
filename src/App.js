/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from './pages/OnBoarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewNote from './pages/NewNote';
import EditNote from './pages/EditNote';
import Settings from './pages/Settings';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{title: 'OnBoarding', headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Register',
            headerTitle: 'Register',
            headerStyle: {
              backgroundColor: '#FFF1CE',
            },
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="New Note"
          component={NewNote}
          options={{
            title: 'New Note',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edit Note"
          component={EditNote}
          options={{
            title: 'Edit Note',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings',
            headerTitle: 'Pengaturan',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
