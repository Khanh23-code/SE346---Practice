import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './MainTabs/HomePage';
import Profile from './MainTabs/Profile';

const Tab = createBottomTabNavigator();

export default function MainTabs({ route, userList, onUpdate }) {
  const loginUser = route.params?.userData || {};

  console.log("MainTabs: " + loginUser?.userName);

  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage">
        {(props) => <HomePage {...props} userList={userList} userData={loginUser} />}
      </Tab.Screen>
      
      <Tab.Screen name="Profile">
        {(props) => <Profile {...props} onUpdate={onUpdate} userData={loginUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};