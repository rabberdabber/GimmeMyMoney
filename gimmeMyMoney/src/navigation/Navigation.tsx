import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import DetailScreen from '../screens/DetailScreen';
import {ScreenName} from './type';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ScreenName.MainScreen} component={MainScreen} />
        <Stack.Screen name={ScreenName.DetailScreen} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
