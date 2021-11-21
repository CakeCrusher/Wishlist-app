import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {store} from './redux/store';
import { connect, Provider } from 'react-redux'
import Signin from './screens/Signin';
import { NativeBaseProvider, Text, Box, extendTheme } from 'native-base';

import Wishlist from './screens/Wishlist';
import Offers from './screens/Offers';

const Stack = createNativeStackNavigator();

const newColorTheme = {
  brand: {
    900: '#db2777',
    800: '#f9a8d4',
    700: '#fdf2f8',
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  return (
    <Provider store={store} >
      <NativeBaseProvider theme={theme}>
        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Wishlist"
              component={Wishlist}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Offers"
              component={Offers}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
