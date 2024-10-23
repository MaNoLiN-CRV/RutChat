// HomeScreen.jsx
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'



export default function HomeScreen( {socket}, {navigation}) {
    console.log(socket)
  return (
    <View style={styles.container}>

      <Text style={styles.text}>HomeScreen</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  }
});