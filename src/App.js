import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initDB } from './database';

import Register from './Views/Register';
import Login from './Views/Login';
import MainTabs from './Views/MainTabs';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      initDB();
    } 
    catch (error) {
      console.log("Lỗi khi setup DB trong App.js:", error);
    } 
    finally {
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return null; 
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainTabs" options={{ headerShown: false }} component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}