import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './Views/Register';
import Login from './Views/Login';
import Profile from './Views/Profile';
import HomePage from './Views/HomePage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userList, setUserList] = useState([]);

  const checkEmailExist = (newUser) => {
    for (var user of userList) {
      if (newUser.email == user.email) return true;
    }

    return false;
  }

  const updateUserData = (newUserData) => {
    setUserList((prevList) => 
      prevList.map((user) => 
        user.email === newUserData.email ? newUserData : user
      )
    );
    alert("Save data completely!");
  }

  const handleRegister = (newUser) => {
    const isExist = checkEmailExist(newUser);
    if (isExist) {
      alert("This email had been used!");
      return false;
    }

    setUserList((prevList) => [...prevList, newUser]);
    console.log("User list:", [...userList, newUser]);
    return true;
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
        <Stack.Screen name="Profile">
          {props => <Profile {...props} onUpdate={updateUserData} />}
        </Stack.Screen>
        <Stack.Screen name="HomePage">
          {props => <HomePage {...props} userList={userList} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}