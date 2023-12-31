import React from 'react';
import {View,Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Splash,Onboarding,Login,app,Login2,AppScreen} from './src/screens'

const Stack = createNativeStackNavigator();
const App = ()=>{
  return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} >
              
              <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="AppScreen" component={AppScreen} />

                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Login2" component={Login2} />
              <Stack.Screen name="Login" component={Login} />

            </Stack.Navigator>
          </NavigationContainer>
  );
}

export default App