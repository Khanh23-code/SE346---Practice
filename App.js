import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './Register';
import Login from './Login';
import Profile from './Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userList, setUserList] = useState([]);

  const handleRegister = (newUser) => {
    setUserList((prevList) => [...prevList, newUser]);
    console.log("User list:", [...userList, newUser]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register">
          {props => <Register {...props} onRegister={handleRegister} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => <Login {...props} userList={userList} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}