import { View, Text, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from '@rneui/base';
import { StyleSheet } from 'react-native';



export default function ChatComponent({ socket }) {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Configurar el listener del socket solo una vez al montar el componente
    socket.on('message', (message) => {
      handleReceiveMessage(message);
    });

    // Limpieza del listener cuando el componente se desmonte
    return () => {
      socket.off('message');
    };

  }, []); // Array de dependencias vacío para que solo se ejecute al montar

  const handleReceiveMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleSendMessage = () => {
    socket.emit('message', input);
    setInput('');
  }


  return (
    <View style={styles.chatContainer}>

      <Text>Bienvenido al RutChat edición React Native</Text>

      <View style={styles.chat}  >

        <Text>Chat</Text>


        <ScrollView style={styles.chatScrollContainer}>


          {messages.map((message, index) => (
            <Text key={index}>{message}</Text>
          )


          )}
        </ScrollView>


        <TextInput

          value={input}
          onChangeText={setInput}
          style={styles.textoInput}>


        </TextInput>

        <Button title="Enviar" onPress={handleSendMessage} />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 20,
  },
  text: {
    fontSize: 24,
  },
  chatScrollContainer: {


    flex: 1,
    padding: 20,
    backgroundColor: 'lightgray',
    marginBottom: 20
  },

  chat: {

    flex: 1,
    backgroundColor: 'red',
    padding: 20,

  },

  textoInput: {
    padding: 10,
    backgroundColor: 'white',
  }


});