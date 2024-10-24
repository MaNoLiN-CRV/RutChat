// HomeScreen.jsx
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ChatComponent from '../components/Chat/ChatComponent';



export default function HomeScreen( {socket}, {navigation}) {
    console.log(socket)
  return (
    <View style={styles.container}>

      <Text style={styles.text}>HomeScreen</Text>

      <ChatComponent socket={socket}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  text: {
    fontSize: 24,
  }
});