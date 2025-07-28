import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {Ionicons} from '@expo/vector-icons'

const Tabslayout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor:"red",
      tabBarInactiveTintColor:"green",
      tabBarStyle:{
        backgroundColor:"blue",
        borderTopWidth:1,
        borderTopColor:"yellow",
        height:90,
        paddingBottom:30,
        paddingTop:10,
      },
      tabBarLabelStyle:{
        fontSize:12,
        fontWeight:"600",
      },
      headerShown:false,
    }}
    >
      <Tabs.Screen
      name='index'
      options={{
        title:"Todos",
        tabBarIcon: ({color,size})=>(
          <Ionicons name='flash-outline' size={size} color={color}></Ionicons>
        )
      }}
      >
      </Tabs.Screen>

      <Tabs.Screen
      name='setting'
      options={{
        title:"Setting",
        tabBarIcon: ({color,size})=>(
          <Ionicons name='settings' size={size} color={color}></Ionicons>
        )
      }}
      >
      </Tabs.Screen>
    </Tabs>
  )
}

export default Tabslayout