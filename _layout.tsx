import React from 'react';
import { Link, Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{headerShown : false}}
    tabBarOptions={{
      activeTintColor: '#06C149',
      inactiveTintColor: 'gray',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color}:{color: string}) => <AntDesign name="home" size={24} color={color} /> 
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Release Calendar',
          tabBarIcon: ({color}:{color: string}) => <AntDesign name="calendar" size={24} color={color}/>
        }}
      />
         <Tabs.Screen
        name="My List"
        options={{
          title: 'My list',
          tabBarIcon: ({color}:{color: string}) => <AntDesign name="profile" size={24} color={color}/>
        }}
      />
         <Tabs.Screen
        name="Download"
        options={{
          title: 'Download',
          tabBarIcon: ({color}:{color: string}) => <AntDesign name="download" size={24} color={color}/>
        }}
      />
         <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({color}:{color: string}) => <AntDesign name="customerservice" size={24} color={color}/>
        }}
      />
    </Tabs>
  );
}
