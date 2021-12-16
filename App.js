import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { encode, decode } from 'base-64';
import AppContext from './context/AppContext';
import Home from './screens/Home';
import Details from './screens/Details';
import PaySuccess from './screens/PaySuccess';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppContext.Provider value={{}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
          <Stack.Screen name='Details' component={Details} options={{headerShown: false}} />
          <Stack.Screen name='Pay' component={PaySuccess} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>    
  );
}