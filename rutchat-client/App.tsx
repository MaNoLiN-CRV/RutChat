import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './assets/screens/LoginScreen.jsx';
import HomeScreen from './assets/screens/HomeScreen.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { io } from "socket.io-client";



const Stack = createNativeStackNavigator();

export default function App() {

  const socket = io('http://localhost:3000', {

    //Establece la conexión más rápido USAR WEBSOCKET, en vez de Polling
    //Evita la complejidad del proceso de actualización
    //Tiene menos problemas de compatibilidad con CORS
    //Consume menos recursos tanto en cliente como en servidor

    // HTTP Polling (falla por CORS), por eso ponemos solo websocket

    transports: ['websocket'],
    withCredentials: true
}); 

  return (
   


<NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,  // Oculta el header en todas las pantallas
          gestureEnabled: false, // Desactiva el gesto de "swipe back"
        }}
      >

        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Home" 
          // PASO LAS PROPOS PRETERMINADAS CON EL SPREAD OPERATOR
          component={(props: any) => <HomeScreen {...props} socket={socket} />}
          options={{
            headerLeft: () => null, // Elimina el botón de "back"
            gestureEnabled: false,  // Desactiva el gesto de "swipe back"
          }}
        />
        
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
      
   
      
  );
}
