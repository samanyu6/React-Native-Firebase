/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { createContext, useEffect, useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import AuthScreen from './screens/Authentication/AuthScreen';
import UserLogin from './screens/Authentication/UserLogin';
import DriverLogin from './screens/Authentication/DriverLogin';
import UserSignup from './screens/Authentication/UserSignup';
import DriverSignup from './screens/Authentication/DriverSignup';

import User from './screens/UserScreen/User';
import Driver from './screens/Driver/Driver';

const AuthContext = createContext();
const Stack = createStackNavigator();

const App: () => React$Node = () => {

  const [authValue, setAuth] = useState(null);
  const [type, setType] = useState(null);

  useEffect(()=>{
    (async ()=>{
      try{
        const temp = await AsyncStorage.getItem('@storage_auth_key');
        const typ = await AsyncStorage.getItem('@type');
        setType(typ);
        setAuth(temp);
      }
      catch(e){
      }
    })();
  },[])

  
  if(authValue==null){
   return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen name="Authentication" component={AuthScreen} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="UserSignup" component={UserSignup} />
        <Stack.Screen name="DriverLogin" component={DriverLogin} />
        <Stack.Screen name="DriverSignup" component={DriverSignup} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
  else if(type=="true"){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else if(type=="false"){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Driver" component={Driver} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};


export default App;
