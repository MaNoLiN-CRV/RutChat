import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function ChatComponent() {
  return (
    <View style={styles.chatContainer}>

        <Text>Bienvenido al RutChat edición React Native</Text>

        <ScrollView style={styles.chatScrollContainer}>
            


        </ScrollView>



    </View>
  )


  

} 




StyleSheet.create({
    chatContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightblue',
    },
    text: {
      fontSize: 24,
    },
    chatScrollContainer: {
        
        width: '80%',
        height: '80%',
        backgroundColor: 'lightgray',
    },
  });