/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home/Index';
import Dropdown from './src/components/Dropdown/Dropdown';

const stack =  createStackNavigator();
const App = () => {
    
  return(
    <NavigationContainer>
       <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Screen name="Home" component={Home}></stack.Screen>
        <stack.Screen name="Dropdown" component={Dropdown}></stack.Screen>
       </stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
