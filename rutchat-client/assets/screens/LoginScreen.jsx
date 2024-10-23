import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Button } from '@rneui/themed';



export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView>

      <TextInput placeholder="Username"
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />

      <TextInput placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />

      <Button
        title="Login"
        onPress={onLogin}
        style={styles.button}
      />



    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginHorizontal: 12,
    marginTop: 10,
  }
});
