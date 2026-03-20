import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './Views/HomePage';
import Profile from './Views/Profile';

const Tab = createBottomTabNavigator();

export default function MainTabs({ route, userList, onUpdate }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage">
        {(props) => <HomePage {...props} userList={userList} />}
      </Tab.Screen>
      
      <Tab.Screen name="Profile">
        {(props) => <Profile {...props} onUpdate={onUpdate} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};