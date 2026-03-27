import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Register from './Views/Register';
import Login from './Views/Login';
import MainTabs from './Views/MainTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userList, setUserList] = useState([]);
  const [userPostList, setUserPostList] = useState([]);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('USER_LIST');
        const storedPosts = await AsyncStorage.getItem('USER_POST_LIST');

        if (storedUsers) setUserList(JSON.parse(storedUsers));
        if (storedPosts) setUserPostList(JSON.parse(storedPosts));
      } catch (error) {
        console.log("Error while loading data:", error);
      } finally {
        setIsReady(true); 
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isReady) { 
      AsyncStorage.setItem('USER_LIST', JSON.stringify(userList));
    }
  }, [userList, isReady]);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem('USER_POST_LIST', JSON.stringify(userPostList));
    }
  }, [userPostList, isReady]);

  const clearData = async () => {
    try {
        await AsyncStorage.clear(); 
        
        setUserList([]);
        setUserPostList([]);
        
        Alert.alert("Success", "All data has been deleted!");
    } catch (e) {
        console.log("Error while trying to delete data:", e);
    }
  }

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
    Alert.alert("Success", "Save data completely!");
  }

  const handleRegister = (newUser) => {
    const isExist = checkEmailExist(newUser);
    if (isExist) {
      Alert.alert("Alert", "This email had been used!");
      return false;
    }

    setUserList((prevList) => [...prevList, newUser]);
    console.log("User list:", [...userList, newUser]);

    setUserPostList((prevList) => [...prevList, {
        email: newUser.email,
        posts: []
    }])

    return true;
  };

  const addNewPost = (userData, newPost) => {
    setUserPostList((prevList) => {
      return prevList.map(user => {
        if (user.email === userData.email) {
          return {
            ...user,
            posts: [...user.posts, newPost]
          };
        }
        return user;
      });
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register">
          {props => <Register {...props} onRegister={handleRegister} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => <Login {...props} userList={userList} />}
        </Stack.Screen>
        <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
          {props => (
            <MainTabs 
              {...props} 
              userList={userList} 
              userPostList={userPostList}
              onUpdate={updateUserData} 
              onAddPost={addNewPost}
              onClearData={clearData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}