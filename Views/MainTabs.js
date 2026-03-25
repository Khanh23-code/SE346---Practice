import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import HomePage from './MainTabs/HomePage';
import Profile from './MainTabs/Profile';
import Settings from './MainTabs/Settings';

const Tab = createBottomTabNavigator();

export default function MainTabs({ route, userList, userPostList , onUpdate, onAddPost }) {
  const loginUser = route.params?.userData || {};

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f6803b', 
        tabBarInactiveTintColor: 'gray',  
        tabBarStyle: { paddingBottom: 5, height: 100 }, 
      }}
    >
      <Tab.Screen 
        name="HomePage"
        options={{
          tabBarLabel: 'HomePage',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      >
        {(props) => <HomePage {...props} userData={loginUser} userPostList={userPostList} onAddPost={onAddPost} />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="clipboard-user" size={size} color={color} />
          )
        }}
      >
        {(props) => <Profile {...props} onUpdate={onUpdate} userData={loginUser} />}
      </Tab.Screen>

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};