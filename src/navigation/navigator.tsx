import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {ListScreen} from '../screens/ListScreen';
import {DetailsScreen} from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
